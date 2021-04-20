import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '@services/auth/auth.service';
import { UsersModule } from '@modules/users/users.module';
import { INestApplication } from '@nestjs/common';
import { LocalStrategy } from '@modules/auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from '@schemas/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@modules/auth/constants';
import { JwtStrategy } from '@modules/auth/jwt.strategy';
import { environment } from '@environment/environment';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        MongooseModule.forRoot(environment.DB_END_POINT),
        MongooseModule.forFeature([
          {
            name: Users.name,
            schema: UsersSchema,
          },
        ]),
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60m' },
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      exports: [AuthService, JwtModule],
    }).compile();
    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    app = module.createNestApplication();
    await app.init();
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  // correct password
  it(`/auth/login User login with correct password`, () => {
    return request(environment.ENDPOINT)
      .post('/auth/login')
      .send({ username: 'testUser', password: '12345' })
      .expect(201);
  });

  //wrong password
  it(`/auth/login User login with wrong password`, () => {
    return request(environment.ENDPOINT)
      .post('/auth/login')
      .send({ username: 'testUser', password: '654321' })
      .expect(401);
  });
});
