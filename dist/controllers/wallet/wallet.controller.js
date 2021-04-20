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
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../modules/auth/jwt-auth.guard");
const wallet_service_1 = require("../../services/wallet/wallet.service");
const wallet_model_1 = require("../../models/wallet.model");
let WalletController = class WalletController {
    constructor(walletService) {
        this.walletService = walletService;
    }
    addCoin(params, userWalletReq) {
        return this.walletService.addCoin(params.id, userWalletReq);
    }
    getAvailableCoins(params) {
        return this.walletService.findAvailableCoins(params.id);
    }
    spendCoin(params, requestData) {
        return this.walletService.spendCoin(params.id, requestData);
    }
    reserveAmount(params, requestData) {
        return this.walletService.reserveAmount(params.id, requestData);
    }
    spendReserveAmount(params) {
        return this.walletService.spendReserveAmount(params.id, params.reserveId);
    }
    cancelReserveAmount(params) {
        return this.walletService.cancelReserveAmount(params.id, params.reserveId);
    }
};
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('add'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, wallet_model_1.default]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "addCoin", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('available'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "getAvailableCoins", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('spend'),
    common_1.HttpCode(200),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "spendCoin", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('reserve'),
    common_1.HttpCode(200),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "reserveAmount", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('reserve/:reserveId/spend'),
    common_1.HttpCode(200),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "spendReserveAmount", null);
__decorate([
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('reserve/:reserveId/cancel'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "cancelReserveAmount", null);
WalletController = __decorate([
    common_1.Controller('user/:id/wallet'),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
exports.WalletController = WalletController;
//# sourceMappingURL=wallet.controller.js.map