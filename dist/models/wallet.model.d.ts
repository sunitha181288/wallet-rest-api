import Coin from './coin.model';
declare class UserWalletModel {
    userId: number;
    coins: Array<Coin>;
    constructor(userId: number, coins: Array<Coin>);
}
export default UserWalletModel;
