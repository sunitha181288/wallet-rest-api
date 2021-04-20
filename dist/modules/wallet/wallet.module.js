"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const users_module_1 = require("../users/users.module");
const wallet_controller_1 = require("../../controllers/wallet/wallet.controller");
const wallet_service_1 = require("../../services/wallet/wallet.service");
const wallet_schema_1 = require("../../schemas/wallet.schema");
const reservation_schema_1 = require("../../schemas/reservation.schema");
let WalletModule = class WalletModule {
};
WalletModule = __decorate([
    common_1.Module({
        imports: [
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: wallet_schema_1.UserWallet.name,
                    schema: wallet_schema_1.UserWalletSchema,
                },
                {
                    name: reservation_schema_1.Reservation.name,
                    schema: reservation_schema_1.ReservationSchema,
                },
            ]),
        ],
        controllers: [wallet_controller_1.WalletController],
        providers: [wallet_service_1.WalletService],
    })
], WalletModule);
exports.WalletModule = WalletModule;
//# sourceMappingURL=wallet.module.js.map