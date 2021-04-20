import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from '@services/users/users.service';
import { UserWallet, UserWalletDocument } from '@schemas/wallet.schema';
import { Reservation, ReservationDocument } from '@schemas/reservation.schema';
import UserWalletModel from '@models/wallet.model';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(UserWallet.name)
    private readonly userWalletDoc: Model<UserWalletDocument>,
    @InjectModel(Reservation.name)
    private readonly reservationDoc: Model<ReservationDocument>,
    private usersService: UsersService,
  ) { }

  /**
   * This method used to store user coin to the wallet
   *
   * @Params userId
   * @Params userWalletModel
   * @returns empty
   *
   */
  public async addCoin(
    userId,
    userWalletData: UserWalletModel,
  ): Promise<UserWalletModel> {
    const isUserExists = await this.usersService.isUserExists(userId);
    if (!isUserExists) {
      throw new NotFoundException();
    }
    return this.userWalletDoc.findOneAndUpdate(
      {
        userId,
      },
      userWalletData,
      {
        upsert: true,
        useFindAndModify: false,
      },
    );
  }

  /**
   * This method used to find user coins from the wallet
   *
   * @Params userId
   * @returns Coins[]
   *
   */
  public async findAvailableCoins(userId) {
    const userWallet = await this.userWalletDoc.findOne({ userId });
    if (userWallet) {
      return {
        availableCoins: userWallet.coins,
      };
    } else {
      throw new NotFoundException();
    }
  }

  /**
   * This method used to spend coin from the wallet
   *
   * @Params userId
   * @Params coin
   * @returns empty
   *
   */
  async spendCoin(userId, requestData) {
    const userWallet = await this.userWalletDoc.findOne({ userId });
    if (userWallet) {
      const symbol = requestData.coin.symbol;
      const amount = requestData.coin.amount;
      const userWalletCoin = userWallet.coins.find((coin) => {
        return coin.symbol === symbol;
      });
      if (this.checkWalletBalance(userWalletCoin, amount)) {
        const remainingAmount = userWalletCoin.amount - amount;
        const filteredCoins = userWallet.coins.filter((coin) => {
          return coin.symbol !== symbol;
        });
        const updatedCoins = filteredCoins.concat([
          { symbol, amount: remainingAmount },
        ]);
        await this.updateCoinsById(userWallet._id, {
          userId,
          coins: updatedCoins,
        });
      } else {
        this.throwWalletError();
      }
    } else {
      throw new NotFoundException();
    }
  }

  /**
   * This method used to reserve coin amount from the wallet
   *
   * @Params userId
   * @Params coin
   * @returns empty
   *
   */
  public async reserveAmount(userId, requestData) {
    const userWallet = await this.userWalletDoc.findOne({ userId });
    if (userWallet) {
      const symbol = requestData.coin.symbol;
      const amount = requestData.coin.amount;
      const userWalletCoin = userWallet.coins.find((coin) => {
        return coin.symbol === symbol;
      });
      if (this.checkWalletBalance(userWalletCoin, amount)) {
        let reservationPayLoad;
        const userReservationData = await this.reservationDoc.findOne({
          userId,
        });
        if (userReservationData) {
          if (symbol === userReservationData.coin.symbol) {
            userReservationData.coin.amount =
              amount + userReservationData.coin.amount;
            reservationPayLoad = userReservationData.coin;
          } else {
            this.throwCustomError();
          }
        } else {
          reservationPayLoad = requestData.coin;
        }
        const result = await this.reservationDoc.findOneAndUpdate(
          {
            userId,
          },
          {
            userId,
            coin: reservationPayLoad,
          },
          {
            new: true,
            upsert: true,
            useFindAndModify: false,
          },
        );
        return { reservation_id: result._id };
      } else {
        this.throwWalletError();
      }
    } else {
      throw new NotFoundException();
    }
  }

  /**
   * This method used to spend reserved coin amount from the wallet
   *
   * @Params userId
   * @Params reserveId
   * @returns empty
   *
   */
  public async spendReserveAmount(userId, reserveId) {
    const userWallet = await this.userWalletDoc.findOne({ userId });
    if (userWallet) {
      const userReservationData = await this.reservationDoc.findOne({
        _id: reserveId,
      });
      if (userReservationData) {
        const reserveSymbol = userReservationData.coin.symbol;
        const reserveAmount = userReservationData.coin.amount;
        const userWalletCoin = userWallet.coins.find((coin) => {
          return coin.symbol === reserveSymbol;
        });
        const remainingAmount = userWalletCoin.amount - reserveAmount;
        const filteredCoins = userWallet.coins.filter((coin) => {
          return coin.symbol !== reserveSymbol;
        });
        const updatedCoins = filteredCoins.concat([
          { symbol: reserveSymbol, amount: remainingAmount },
        ]);
        await this.updateCoinsById(userWallet._id, {
          userId,
          coins: updatedCoins,
        });
        await this.deleteReservationById(userReservationData._id);
      } else {
        throw new NotFoundException();
      }
    } else {
      throw new NotFoundException();
    }
  }

  /**
   * This method used to cancel reserved coin amount from the wallet
   *
   * @Params userId
   * @Params reserveId
   * @returns empty
   *
   */
  public async cancelReserveAmount(userId, reserveId) {
    const userWallet = await this.userWalletDoc.findOne({ userId });
    if (userWallet) {
      const userReservationData = await this.reservationDoc.findOne({
        _id: reserveId,
      });
      if (userReservationData) {
        await this.deleteReservationById(userReservationData._id);
      } else {
        throw new NotFoundException();
      }
    } else {
      throw new NotFoundException();
    }
  }

  /**
   * This method used to check balance from the wallet
   *
   * @Params userWalletCoin
   * @Params amount
   * @returns boolean
   *
   */
  private checkWalletBalance(userWalletCoin, amount) {
    return userWalletCoin && amount <= userWalletCoin.amount;
  }

  /**
   * This method used to update user coins
   *
   * @Params _id
   * @Params postData
   * @returns Promise<response>
   *
   */
  private updateCoinsById(_id, postData) {
    return this.userWalletDoc.findByIdAndUpdate(_id, postData, {
      useFindAndModify: false,
    });
  }

  /**
   * This method used to delete user reservation from db
   *
   * @Params _id
   * @returns Promise<response>
   *
   */
  private deleteReservationById(_id) {
    return this.reservationDoc.findOneAndDelete({ _id });
  }

  /**
   * This method used to throw error when fund is insufficient
   *
   * @Params _id
   * @returns Promise<response>
   *
   */
  private throwWalletError() {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Spend Error: Insufficient funds in the wallet.',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  /**
   * This method used to throw custom http error
   *
   * @Params _id
   * @returns Promise<response>
   *
   */
  private throwCustomError() {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'This User already reserved amount in different symbol',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
