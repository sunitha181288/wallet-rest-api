"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
const wallet_schema_1 = require("../../schemas/wallet.schema");
const reservation_schema_1 = require("../../schemas/reservation.schema");
const wallet_model_1 = require("../../models/wallet.model");
let WalletService = class WalletService {
    constructor(userWalletDoc, reservationDoc, usersService) {
        this.userWalletDoc = userWalletDoc;
        this.reservationDoc = reservationDoc;
        this.usersService = usersService;
    }
    async addCoin(userId, userWalletData) {
        const isUserExists = await this.usersService.isUserExists(userId);
        if (!isUserExists) {
            throw new common_1.NotFoundException();
        }
        return this.userWalletDoc.findOneAndUpdate({
            userId,
        }, userWalletData, {
            upsert: true,
            useFindAndModify: false,
        });
    }
    async findAvailableCoins(userId) {
        const userWallet = await this.userWalletDoc.findOne({ userId });
        if (userWallet) {
            return {
                availableCoins: userWallet.coins,
            };
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
    async spendCoin(userId, requestData) {
        const userWallet = await this.userWalletDoc.findOne({ userId });
        if (userWallet) {
            const symbol = requestData.coin.symbol;
            const amount = requestData.coin.amount;
            const userWalletCoin = userWallet.coins.find((coin) => {
                return coin.symbol === symbol;
            });
            if (this.checkWalletBalance(userWalletCoin, amount)) {
                const remainingAmount = userWalletCoin.amount - amount;
                const filteredCoins = userWallet.coins.filter((coin) => {
                    return coin.symbol !== symbol;
                });
                const updatedCoins = filteredCoins.concat([
                    { symbol, amount: remainingAmount },
                ]);
                await this.updateCoinsById(userWallet._id, {
                    userId,
                    coins: updatedCoins,
                });
            }
            else {
                this.throwWalletError();
            }
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
    async reserveAmount(userId, requestData) {
        const userWallet = await this.userWalletDoc.findOne({ userId });
        if (userWallet) {
            const symbol = requestData.coin.symbol;
            const amount = requestData.coin.amount;
            const userWalletCoin = userWallet.coins.find((coin) => {
                return coin.symbol === symbol;
            });
            if (this.checkWalletBalance(userWalletCoin, amount)) {
                let reservationPayLoad;
                const userReservationData = await this.reservationDoc.findOne({
                    userId,
                });
                if (userReservationData) {
                    if (symbol === userReservationData.coin.symbol) {
                        userReservationData.coin.amount =
                            amount + userReservationData.coin.amount;
                        reservationPayLoad = userReservationData.coin;
                    }
                    else {
                        this.throwCustomError();
                    }
                }
                else {
                    reservationPayLoad = requestData.coin;
                }
                const result = await this.reservationDoc.findOneAndUpdate({
                    userId,
                }, {
                    userId,
                    coin: reservationPayLoad,
                }, {
                    new: true,
                    upsert: true,
                    useFindAndModify: false,
                });
                return { reservation_id: result._id };
            }
            else {
                this.throwWalletError();
            }
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
    async spendReserveAmount(userId, reserveId) {
        const userWallet = await this.userWalletDoc.findOne({ userId });
        if (userWallet) {
            const userReservationData = await this.reservationDoc.findOne({
                _id: reserveId,
            });
            if (userReservationData) {
                const reserveSymbol = userReservationData.coin.symbol;
                const reserveAmount = userReservationData.coin.amount;
                const userWalletCoin = userWallet.coins.find((coin) => {
                    return coin.symbol === reserveSymbol;
                });
                const remainingAmount = userWalletCoin.amount - reserveAmount;
                const filteredCoins = userWallet.coins.filter((coin) => {
                    return coin.symbol !== reserveSymbol;
                });
                const updatedCoins = filteredCoins.concat([
                    { symbol: reserveSymbol, amount: remainingAmount },
                ]);
                await this.updateCoinsById(userWallet._id, {
                    userId,
                    coins: updatedCoins,
                });
                await this.deleteReservationById(userReservationData._id);
            }
            else {
                throw new common_1.NotFoundException();
            }
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
    async cancelReserveAmount(userId, reserveId) {
        const userWallet = await this.userWalletDoc.findOne({ userId });
        if (userWallet) {
            const userReservationData = await this.reservationDoc.findOne({
                _id: reserveId,
            });
            if (userReservationData) {
                await this.deleteReservationById(userReservationData._id);
            }
            else {
                throw new common_1.NotFoundException();
            }
        }
        else {
            throw new common_1.NotFoundException();
        }
    }
    checkWalletBalance(userWalletCoin, amount) {
        return userWalletCoin && amount <= userWalletCoin.amount;
    }
    updateCoinsById(_id, postData) {
        return this.userWalletDoc.findByIdAndUpdate(_id, postData, {
            useFindAndModify: false,
        });
    }
    deleteReservationById(_id) {
        return this.reservationDoc.findOneAndDelete({ _id });
    }
    throwWalletError() {
        throw new common_1.HttpException({
            status: common_1.HttpStatus.BAD_REQUEST,
            error: 'Spend Error: Insufficient funds in the wallet.',
        }, common_1.HttpStatus.BAD_REQUEST);
    }
    throwCustomError() {
        throw new common_1.HttpException({
            status: common_1.HttpStatus.BAD_REQUEST,
            error: 'This User already reserved amount in different symbol',
        }, common_1.HttpStatus.BAD_REQUEST);
    }
};
WalletService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(wallet_schema_1.UserWallet.name)),
    __param(1, mongoose_1.InjectModel(reservation_schema_1.Reservation.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        users_service_1.UsersService])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map