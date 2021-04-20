import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from '@services/users/users.service';
import { UsersController } from '@controllers/users/users.controller';
import { Users, UsersSchema } from '@schemas/users.schema';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Users.name,
        useFactory: () => {
          const schema = UsersSchema;
          schema.pre('save', async function (next) {
            /* eslint-disable-next-line */
            const user = this;
            const saltOrRounds = 10;
            const password = user['password'];
            const hash = await bcrypt.hash(password, saltOrRounds);
            user['password'] = hash;
            next();
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
