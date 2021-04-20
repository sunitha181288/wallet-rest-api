import { UsersService } from '@services/users/users.service';
import Users from '@models/users.model';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(userData: Users): Promise<import("../../schemas/users.schema").UsersDocument>;
    findAll(): Promise<Users[]>;
}
