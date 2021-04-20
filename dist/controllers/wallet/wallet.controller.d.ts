import { WalletService } from '@services/wallet/wallet.service';
import UserWalletModel from '@models/wallet.model';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    addCoin(params: any, userWalletReq: UserWalletModel): Promise<UserWalletModel>;
    getAvailableCoins(params: any): Promise<{
        availableCoins: import("../../models/coin.model").default[];
    }>;
    spendCoin(params: any, requestData: any): Promise<void>;
    reserveAmount(params: any, requestData: any): Promise<{
        reservation_id: any;
    }>;
    spendReserveAmount(params: any): Promise<void>;
    cancelReserveAmount(params: any): Promise<void>;
}
