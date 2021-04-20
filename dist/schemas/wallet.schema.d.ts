/// <reference types="mongoose-sequence" />
import { Document } from 'mongoose';
import Coin from '@models/coin.model';
export declare type UserWalletDocument = UserWallet & Document;
export declare class UserWallet {
    userId: number;
    coins: Array<Coin>;
}
export declare const UserWalletSchema: import("mongoose").Schema<Document<UserWallet, {}>, import("mongoose").Model<any, any>, undefined>;
