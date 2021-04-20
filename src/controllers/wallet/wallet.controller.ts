import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Param,
  Query,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { WalletService } from '@services/wallet/wallet.service';
import UserWalletModel from '@models/wallet.model';

@Controller('user/:id/wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) { }

  /**
   * Add coin to the user wallet
   *
   * @Query userId
   * @Body UserWalletModel
   * @returns empty
   *
   */
  @UseGuards(JwtAuthGuard)
  @Post('add')
  public addCoin(@Param() params, @Body() userWalletReq: UserWalletModel) {
    return this.walletService.addCoin(params.id, userWalletReq);
  }

  /**
   * Fetch available coins in the user wallet
   *
   * @param userId
   * @returns Coins[]
   *
   */
  @UseGuards(JwtAuthGuard)
  @Get('available')
  public getAvailableCoins(@Param() params) {
    return this.walletService.findAvailableCoins(params.id);
  }

  /**
   * Spending specific coin from the user wallet
   *
   * @param userId
   * @Body Coin
   * @returns empty
   *
   */
  @UseGuards(JwtAuthGuard)
  @Post('spend')
  @HttpCode(200)
  public spendCoin(@Param() params, @Body() requestData) {
    return this.walletService.spendCoin(params.id, requestData);
  }

  /**
   * Reserving specific coin from the user wallet
   *
   * @param userId
   * @Body Coin
   * @returns empty
   *
   */
  @UseGuards(JwtAuthGuard)
  @Post('reserve')
  @HttpCode(200)
  public reserveAmount(@Param() params, @Body() requestData) {
    return this.walletService.reserveAmount(params.id, requestData);
  }

  /**
   * Spending reserved coin from the user wallet
   *
   * @param userId
   * @param reserveId
   * @returns empty
   *
   */
  @UseGuards(JwtAuthGuard)
  @Post('reserve/:reserveId/spend')
  @HttpCode(200)
  public spendReserveAmount(@Param() params) {
    return this.walletService.spendReserveAmount(params.id, params.reserveId);
  }

  /**
   * Canceling reserved coin from the user wallet
   *
   * @param userId
   * @param reserveId
   * @returns empty
   *
   */
  @UseGuards(JwtAuthGuard)
  @Delete('reserve/:reserveId/cancel')
  public cancelReserveAmount(@Param() params) {
    return this.walletService.cancelReserveAmount(params.id, params.reserveId);
  }
}
