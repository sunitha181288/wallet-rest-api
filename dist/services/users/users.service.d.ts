import { Model } from 'mongoose';
import { UsersDocument } from '@schemas/users.schema';
import UsersModel from '@models/users.model';
export declare class UsersService {
    private readonly userDocModel;
    constructor(userDocModel: Model<UsersDocument>);
    create(userData: UsersModel): Promise<UsersDocument>;
    findAll(): Promise<UsersModel[]>;
    findUserByName(userName: string): Promise<UsersDocument>;
    findUserById(userId: number): Promise<UsersDocument>;
    isUserExists(userId: number): Promise<boolean>;
}
