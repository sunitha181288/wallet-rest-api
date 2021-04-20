import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '@modules/auth/local-auth.guard';
import { AuthService } from '@services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Authenicate the user using credential
   *
   * @Body username
   * @Body password
   * @returns accessToken
   *
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login(@Body() postData) {
    return this.authService.login(postData);
  }
}
