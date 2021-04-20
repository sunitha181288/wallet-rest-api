/// <reference types="mongoose-sequence" />
import { Document } from 'mongoose';
import Coin from '@models/coin.model';
export declare type ReservationDocument = Reservation & Document;
export declare class Reservation {
    userId: number;
    coin: Coin;
}
export declare const ReservationSchema: import("mongoose").Schema<Document<Reservation, {}>, import("mongoose").Model<any, any>, undefined>;
