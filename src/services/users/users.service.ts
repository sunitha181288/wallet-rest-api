import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from '@schemas/users.schema';
import UsersModel from '@models/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private readonly userDocModel: Model<UsersDocument>,
  ) {}

  /**
   * This method used to create users
   *
   * @Body UserData
   * @returns empty
   *
   */
  public async create(userData: UsersModel): Promise<UsersDocument> {
    const user = await this.findUserByName(userData.userName);
    if (user) {
      return;
    }
    const createdUser = new this.userDocModel(userData);
    return createdUser.save();
  }

  /**
   * This method used to get all the users
   *
   * @Param userId
   * @returns Users[]
   *
   */
  async findAll(): Promise<UsersModel[]> {
    return this.userDocModel.find().exec();
  }

  /**
   * This method used to find user by userName
   *
   * @Param userName
   * @returns User
   *
   */
  async findUserByName(userName: string): Promise<UsersDocument> {
    return this.userDocModel.findOne({ userName });
  }

  /**
   * This method used to find user by id
   *
   * @Param userId
   * @returns User
   *
   */
  async findUserById(userId: number): Promise<UsersDocument> {
    return this.userDocModel.findOne({ userId });
  }

  /**
   * Check whether user exists or not
   *
   * @Param userId
   * @returns boolean
   *
   */
  public isUserExists(userId: number): Promise<boolean> {
    return this.userDocModel.exists({ userId });
  }
}
