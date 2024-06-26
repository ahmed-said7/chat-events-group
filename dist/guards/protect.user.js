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
exports.Protected = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const models_1 = require("../enums/models");
const mongoose_2 = require("mongoose");
;
let Protected = class Protected {
    constructor(config, Usermodel) {
        this.config = config;
        this.Usermodel = Usermodel;
    }
    ;
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        let token;
        if (req.headers.authorization
            && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        ;
        if (!token) {
            throw new common_1.BadRequestException("provide token");
        }
        ;
        let decoded = null;
        try {
            decoded = jwt.verify(token, this.config.get("secret"));
        }
        catch (e) {
            throw new common_1.HttpException("invalid token , please login again", 400);
        }
        ;
        if (!decoded) {
            throw new common_1.HttpException("token is not valid", 400);
        }
        ;
        const user = await this.Usermodel.findById(decoded?.userId);
        if (!user) {
            throw new common_1.HttpException("user not found", 400);
        }
        ;
        if (user.passwordChangedAt) {
            const stamps = new Date(user.passwordChangedAt).getTime() / 1000;
            if (stamps > decoded.iat) {
                throw new common_1.HttpException("password changed,please login again", 400);
            }
            ;
        }
        ;
        req.user = user;
        return true;
    }
    ;
};
exports.Protected = Protected;
exports.Protected = Protected = __decorate([
    __param(1, (0, mongoose_1.InjectModel)(models_1.Models.User)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model])
], Protected);
//# sourceMappingURL=protect.user.js.map