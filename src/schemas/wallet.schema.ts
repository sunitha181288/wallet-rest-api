import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import Coin from '@models/coin.model';

export type UserWalletDocument = UserWallet & Document;

@Schema()
export class UserWallet {
  @Prop({ required: true })
  userId: number;
  @Prop()
  coins: Array<Coin>;
}

export const UserWalletSchema = SchemaFactory.createForClass(UserWallet);
