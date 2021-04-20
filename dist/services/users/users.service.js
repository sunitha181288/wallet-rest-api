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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("../../schemas/users.schema");
const users_model_1 = require("../../models/users.model");
let UsersService = class UsersService {
    constructor(userDocModel) {
        this.userDocModel = userDocModel;
    }
    async create(userData) {
        const user = await this.findUserByName(userData.userName);
        if (user) {
            return;
        }
        const createdUser = new this.userDocModel(userData);
        return createdUser.save();
    }
    async findAll() {
        return this.userDocModel.find().exec();
    }
    async findUserByName(userName) {
        return this.userDocModel.findOne({ userName });
    }
    async findUserById(userId) {
        return this.userDocModel.findOne({ userId });
    }
    isUserExists(userId) {
        return this.userDocModel.exists({ userId });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(users_schema_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map