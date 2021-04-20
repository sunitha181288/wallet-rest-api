import { IsNotEmpty } from 'class-validator';
export default class UsersModel {
  userId: number;
  @IsNotEmpty()
  userName: string;
  @IsNotEmpty()
  password: string;
}
