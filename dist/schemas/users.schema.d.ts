/// <reference types="mongoose-sequence" />
import { Document } from 'mongoose';
export declare type UsersDocument = Users & Document;
export declare class Users {
    userId: number;
    userName: string;
    password: string;
}
export declare const UsersSchema: import("mongoose").Schema<Document<Users, {}>, import("mongoose").Model<any, any>, undefined>;
