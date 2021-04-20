import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ required: true })
  userId: number;
  @Prop()
  userName: string;
  @Prop()
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
