import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import Coin from '@models/coin.model';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ required: true })
  userId: number;
  @Prop()
  coin: Coin;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
