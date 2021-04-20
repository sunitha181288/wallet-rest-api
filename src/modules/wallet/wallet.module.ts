import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '@modules/users/users.module';
import { WalletController } from '@controllers/wallet/wallet.controller';
import { WalletService } from '@services/wallet/wallet.service';
import { UserWallet, UserWalletSchema } from '@schemas/wallet.schema';
import { Reservation, ReservationSchema } from '@schemas/reservation.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: UserWallet.name,
        schema: UserWalletSchema,
      },
      {
        name: Reservation.name,
        schema: ReservationSchema,
      },
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
