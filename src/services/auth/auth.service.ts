import { Injectable } from '@nestjs/common';
import { UsersService } from '@services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validate user with given credentials
   *
   * @Params username
   * @Params pass
   * @returns Boolean
   *
   */
  public async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUserByName(username);
    if (user) {
      return await bcrypt.compare(pass, user.password);
    }
    return false;
  }

  /**
   * This method used to sign & generate JWT token
   *
   * @Params username
   * @returns accessToken
   *
   */
  public async login(user) {
    const userData = await this.usersService.findUserByName(user.username);
    const payload = { username: user.username };
    return {
      ...userData['_doc'],
      access_token: this.jwtService.sign(payload),
    };
  }
}
