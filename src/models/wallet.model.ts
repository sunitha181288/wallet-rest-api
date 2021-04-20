import { IsNotEmpty } from 'class-validator';
import Coin from './coin.model';

class UserWalletModel {
  public userId: number;
  @IsNotEmpty()
  public coins: Array<Coin>;

  constructor(userId: number, coins: Array<Coin>) {
    this.userId = userId;
    this.coins = coins;
  }
}

export default UserWalletModel;
