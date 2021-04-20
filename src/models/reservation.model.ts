import { IsNotEmpty } from 'class-validator';
import Coin from './coin.model';
class ReservationModel {
  @IsNotEmpty()
  public userId: number;
  @IsNotEmpty()
  public coin: Coin;

  constructor(userId: number, coin: Coin) {
    this.userId = userId;
    this.coin = coin;
  }
}

export default ReservationModel;
