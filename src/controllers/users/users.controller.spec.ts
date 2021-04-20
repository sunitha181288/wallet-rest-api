import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UsersModule } from '@modules/users/users.module';
import { UsersController } from './users.controller';
import { UsersService } from '@services/users/users.service';
import { Users, UsersSchema } from '@schemas/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@environment/environment';

describe('UserController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        UsersModule,
        MongooseModule.forRoot(environment.DB_END_POINT),
        MongooseModule.forFeature([
          {
            name: Users.name,
            schema: UsersSchema,
          },
        ]),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('Controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  // user creation
  it(`/users create users`, () => {
    return request(environment.ENDPOINT)
      .post('/users')
      .send({ userId: 2, userName: 'testUser', password: '12345' })
      .expect(201);
  });
});
