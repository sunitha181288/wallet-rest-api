import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@modules/auth/jwt-auth.guard';
import { UsersService } from '@services/users/users.service';
import Users from '@models/users.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create new user
   *
   * @Body userId
   * @Body username
   * @Body password
   * @returns empty
   *
   */
  @Post()
  public create(@Body() userData: Users) {
    return this.usersService.create(userData);
  }

  /**
   * Get all the users
   *
   * @returns Users[]
   *
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  public findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }
}
