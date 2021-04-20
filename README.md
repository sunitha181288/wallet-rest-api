<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Prerequisites
* [Nest.js](https://docs.nestjs.com/first-steps) (with NPM)
* [Mongodb](https://docs.mongodb.com/manual/administration/install-community/)

## Installation

```bash
$ npm install
```

## Running Swagger

```bash
$ npm run start
$ Open the url http://localhost:3000/api/# in your browser.
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Curl Calls

## Create User

```
curl -X POST \
  http://localhost:3000/users \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
    "userId" : 1,
	"userName": "test",
	"password": "12345"
}'
```

## Login User

```
curl -X POST \
  http://localhost:3000/auth/login \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{"username": "testUser", "password": "12345"}'

 Get access token from the response.
```

## Add Coin to the wallet

```
  curl -X POST \
  http://localhost:3000/user/USER_ID/wallet/add \
  -H 'authorization: Bearer ACCESS_TOKEN' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"coins": [{
		"symbol": "BTC",
		 "amount": 10001
	},{
		"symbol": "Bitcoin",
		 "amount": 10002
	}]
}'

Get access token and userId from the login response.

```

## Available coins
```
curl -X GET \
  'http://localhost:3000/user/USER_ID/wallet/available' \
  -H 'authorization: Bearer ACCESS_TOKEN' \
  -H 'cache-control: no-cache' \
  -H 'postman-token: cc58ecb5-1cee-7020-1ff4-adc1c2b75ac3'

Get access token and userId from the login response.
 ```
## Spend coin from the wallet
```
  curl -X POST \
    http://localhost:3000/user/USER_ID/wallet/spend \
    -H 'authorization: Bearer ACCESS_TOKEN' \
    -H 'cache-control: no-cache' \
    -H 'content-type: application/json' \
    -d '{
  	"coin": {
  		"symbol": "BTC",
  		 "amount": 1000
  	}
  }'

Get access token and userId from the login response.

```

## Reserve coin from the wallet
```
curl -X POST \
  http://localhost:3000/user/USER_ID/wallet/reserve \
  -H 'authorization: Bearer ACCESS_TOKEN' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"coin": {
		"symbol": "BTC",
		"amount": 100
	}
}'

Get access token and userId from the login response.
```

## Spend Reserve coin from the wallet
```
curl -X POST \
  http://localhost:3000/user/USER_ID/wallet/reserve/RESERVE_ID/spend \
  -H 'authorization: Bearer ACCESS_TOKEN' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \

Get access token and userId from the login response.
Get reserveId from the reserve API response.

```

## Cancel Reserved Coin from the wallet
```
curl -X DELETE \
  http://localhost:3000/user/USER_ID/wallet/reserve/RESERVE_ID/cancel \
  -H 'authorization: Bearer ACCESS_TOKEN' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \

Get access token and userId from the login response.
Get reserveId from the reserve API response.   
```
