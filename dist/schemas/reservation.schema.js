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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationSchema = exports.Reservation = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const coin_model_1 = require("../models/coin.model");
let Reservation = class Reservation {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Number)
], Reservation.prototype, "userId", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", coin_model_1.default)
], Reservation.prototype, "coin", void 0);
Reservation = __decorate([
    mongoose_1.Schema()
], Reservation);
exports.Reservation = Reservation;
exports.ReservationSchema = mongoose_1.SchemaFactory.createForClass(Reservation);
//# sourceMappingURL=reservation.schema.js.map