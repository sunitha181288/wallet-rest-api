import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { UsersModule } from '@modules/users/users.module';
import { WalletController } from './wallet.controller';
import { WalletService } from '@services/wallet/wallet.service';
import { WalletModule } from '@modules/wallet/wallet.module';
import { UserWallet, UserWalletSchema } from '@schemas/wallet.schema';
import { Reservation, ReservationSchema } from '@schemas/reservation.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { INestApplication } from '@nestjs/common';
import { environment } from '@environment/environment';

describe('WalletController', () => {
  let app: INestApplication;
  let controller: WalletController;
  let service: WalletService;
  let loginResponse;
  let userId;
  let reservationId;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        UsersModule,
        WalletModule,
        MongooseModule.forRoot(environment.DB_END_POINT),
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
    }).compile();
    controller = moduleRef.get<WalletController>(WalletController);
    service = moduleRef.get<WalletService>(WalletService);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('service should be defined', () => {
    expect(service).toBeDefined();
  });

  it(`/auth/login User login`, async () => {
    loginResponse = await request(environment.ENDPOINT)
      .post('/auth/login')
      .send({ username: 'testUser', password: '12345' })
      .expect(201);
    userId = loginResponse.body.userId;
  });

  it(`/POST Add Coin`, () => {
    return request(environment.ENDPOINT)
      .post(`/user/${userId}/wallet/add`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${loginResponse.body.access_token}`)
      .send({
        userId,
        coins: [
          {
            symbol: 'BTC',
            amount: 10001,
          },
          {
            symbol: 'Bitcoin',
            amount: 10002,
          },
        ],
      })
      .expect(201);
  });

  it(`/GET Available coins`, () => {
    return request(environment.ENDPOINT)
      .get(`/user/${userId}/wallet/available`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${loginResponse.body.access_token}`)
      .expect(200);
  });

  it(`/POST Spend wallet coins`, () => {
    return request(environment.ENDPOINT)
      .post(`/user/${userId}/wallet/spend`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${loginResponse.body.access_token}`)
      .send({
        coin: {
          symbol: 'BTC',
          amount: 100,
        },
      })
      .expect(200);
  });

  it(`/POST Reserve wallet coins`, async () => {
    const result = await request(environment.ENDPOINT)
      .post(`/user/${userId}/wallet/reserve`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${loginResponse.body.access_token}`)
      .send({
        coin: {
          symbol: 'BTC',
          amount: 50,
        },
      })
      .expect(200);
    reservationId = result.body.reservation_id;
  });

  it(`/POST Spend reserved wallet coins`, async () => {
    await request(environment.ENDPOINT)
      .post(`/user/${userId}/wallet/reserve/${reservationId}/spend`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${loginResponse.body.access_token}`)
      .expect(200);
  });

  it(`/POST Cancel reserved wallet coins`, async () => {
    const result = await request(environment.ENDPOINT)
      .post(`/user/${userId}/wallet/reserve`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${loginResponse.body.access_token}`)
      .send({
        coin: {
          symbol: 'BTC',
          amount: 50,
        },
      })
      .expect(200);
    return request(environment.ENDPOINT)
      .delete(
        `/user/${userId}/wallet/reserve/${result.body.reservation_id}/cancel`,
      )
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${loginResponse.body.access_token}`)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
