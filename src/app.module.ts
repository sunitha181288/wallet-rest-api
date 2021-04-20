import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { WalletModule } from '@modules/wallet/wallet.module';
import { environment } from '@environment/environment';

@Module({
  imports: [
    MongooseModule.forRoot(environment.DB_END_POINT),
    UsersModule,
    WalletModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
