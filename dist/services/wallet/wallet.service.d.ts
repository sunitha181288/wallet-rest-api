import { Model } from 'mongoose';
import { UsersService } from '@services/users/users.service';
import { UserWalletDocument } from '@schemas/wallet.schema';
import { ReservationDocument } from '@schemas/reservation.schema';
import UserWalletModel from '@models/wallet.model';
export declare class WalletService {
    private readonly userWalletDoc;
    private readonly reservationDoc;
    private usersService;
    constructor(userWalletDoc: Model<UserWalletDocument>, reservationDoc: Model<ReservationDocument>, usersService: UsersService);
    addCoin(userId: any, userWalletData: UserWalletModel): Promise<UserWalletModel>;
    findAvailableCoins(userId: any): Promise<{
        availableCoins: import("../../models/coin.model").default[];
    }>;
    spendCoin(userId: any, requestData: any): Promise<void>;
    reserveAmount(userId: any, requestData: any): Promise<{
        reservation_id: any;
    }>;
    spendReserveAmount(userId: any, reserveId: any): Promise<void>;
    cancelReserveAmount(userId: any, reserveId: any): Promise<void>;
    private checkWalletBalance;
    private updateCoinsById;
    private deleteReservationById;
    private throwWalletError;
    private throwCustomError;
}
