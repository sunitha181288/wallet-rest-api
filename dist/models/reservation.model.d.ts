import Coin from './coin.model';
declare class ReservationModel {
    userId: number;
    coin: Coin;
    constructor(userId: number, coin: Coin);
}
export default ReservationModel;
