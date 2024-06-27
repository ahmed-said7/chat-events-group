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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../enums/models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
const crypto = require("crypto");
const nodemailer_service_1 = require("../nodemailer/nodemailer.service");
;
;
;
;
let UserService = class UserService {
    constructor(config, Usermodel, mailerService) {
        this.config = config;
        this.Usermodel = Usermodel;
        this.mailerService = mailerService;
    }
    ;
    async signup(body) {
        let user = await this.validateEmail(body.email);
        user = await this.Usermodel.create(body);
        const token = this.createtoken(user._id);
        return { token, user };
    }
    ;
    async emailVerification(user) {
        const code = this.mailerService.resetCode();
        user.emailVerifiedCode = this.createHash(code);
        user.emailVerifiedExpired = new Date(Date.now() + 5 * 60 * 1000);
        try {
            await this.mailerService.sendWelcome({ email: user.email, resetCode: code });
        }
        catch (err) {
            user.emailVerifiedCode = undefined;
            user.emailVerifiedExpired = undefined;
            await user.save();
            throw new common_1.HttpException("nodemailer error", 400);
        }
        ;
        await user.save();
    }
    ;
    async createEmailVerificationCode(user) {
        if (user.emailVertified) {
            throw new common_1.HttpException("your email has been verified already", 400);
        }
        ;
        await this.emailVerification(user);
        return { status: "code sent" };
    }
    ;
    createHash(code) {
        return crypto.createHash('sha256').update(code).digest('hex');
    }
    async verifyEmail(code) {
        const hash = this.createHash(code);
        const user = await this.Usermodel.findOne({
            emailVerifiedCode: hash, emailVerifiedExpired: { $gt: Date.now() }
        });
        if (!user) {
            throw new common_1.HttpException('email Verified Code expired', 400);
        }
        ;
        user.emailVerifiedCode = undefined;
        user.emailVerifiedExpired = undefined;
        user.emailVertified = true;
        await user.save();
        return { status: "verified" };
    }
    ;
    async login(body) {
        let user = await this.Usermodel.findOne({ email: body.email });
        if (!user) {
            throw new common_1.HttpException("user not found", 400);
        }
        ;
        const valid = await bcryptjs.compare(body.password, user.password);
        if (!valid) {
            throw new common_1.HttpException("password or email is not correct", 400);
        }
        ;
        const token = this.createtoken(user._id);
        return { token, user };
    }
    ;
    createtoken(userId) {
        const token = jwt.
            sign({ userId }, this.config.get("secret"), { expiresIn: "12d" });
        return "Bearer " + token;
    }
    ;
    async updatepassword(body, user) {
        const valid = await bcryptjs.compare(body.currentPassword, user.password);
        if (!valid) {
            throw new common_1.HttpException("current password is not correct", 400);
        }
        ;
        if (body.password !== body.passwordConfirm) {
            throw new common_1.HttpException("password does not match password confirm", 400);
        }
        ;
        user.password = body.password;
        user.passwordChangedAt = new Date();
        await user.save();
        return { user, status: "password has been updated" };
    }
    ;
    async deleteUser(user) {
        await user.deleteOne();
        return { status: " user deleted" };
    }
    ;
    async getUser(user) {
        user.password = null;
        user.passwordChangedAt = null;
        return { user };
    }
    ;
    async validateEmail(email) {
        let user = await this.Usermodel.findOne({ email });
        if (user) {
            throw new common_1.HttpException("email already exists", 400);
        }
        ;
        return user;
    }
    ;
    async updateUser(body, user) {
        if (body.email) {
            await this.validateEmail(body.email);
        }
        ;
        const updated = await this.Usermodel.findByIdAndUpdate(user._id, body, { new: true });
        return { status: "updated", user: updated };
    }
    ;
    async getOneUser(userId) {
        const user = await this.Usermodel.findOne({ _id: userId });
        if (!user) {
            throw new common_1.HttpException("User not found", 400);
        }
        ;
        return { user };
    }
    ;
    async forgetPassword(email) {
        let user = await this.Usermodel.findOne({ email });
        if (!user) {
            throw new common_1.HttpException('user not found', 400);
        }
        ;
        const resetCode = this.mailerService.resetCode();
        user.passwordResetCode = this.createHash(resetCode);
        user.passwordResetCodeExpires = new Date(Date.now() + 4 * 60 * 1000);
        await user.save();
        try {
            await this.mailerService
                .sendChangeingPasswordCode({ email: user.email, resetCode });
        }
        catch (e) {
            console.log(e);
            user.passwordResetCode = undefined;
            user.passwordResetCodeExpires = undefined;
            await user.save();
            throw new common_1.HttpException('internal server error', 400);
        }
        ;
        return { resetCode };
    }
    ;
    async vertfyResetCode(resetCode) {
        const hash = this.createHash(resetCode);
        let user = await this.Usermodel
            .findOne({
            passwordResetCode: hash,
            passwordResetCodeExpires: { $gt: Date.now() }
        });
        if (!user) {
            throw new common_1.HttpException('user not found', 400);
        }
        ;
        user.passwordResetCode = undefined;
        user.passwordResetCodeExpires = undefined;
        user.passwordResetCodeVertified = true;
        await user.save();
        return { status: 'verified' };
    }
    ;
    async changePassword(body) {
        let user = await this.Usermodel
            .findOne({ email: body.email });
        if (!user) {
            throw new common_1.HttpException('user not found', 400);
        }
        ;
        if (!user.passwordResetCodeVertified) {
            throw new common_1.HttpException('resetcode is not vertified', 400);
        }
        ;
        if (body.password !== body.passwordConfirm) {
            throw new common_1.HttpException('password mismatch', 400);
        }
        ;
        user.passwordResetCodeVertified = null;
        user.password = body.password;
        user.passwordChangedAt = new Date();
        await user.save();
        return { user };
    }
    ;
    async getUsersBySearchName(keyword) {
        const users = await this.Usermodel.find({
            $text: { $search: keyword }
        });
        return { users };
    }
    ;
    async addFollow(userId, user) {
        const followingUser = await this.Usermodel.findById(userId);
        if (!followingUser) {
            throw new common_1.HttpException("User not found", 400);
        }
        ;
        if (followingUser.followers.includes(user._id)) {
            throw new common_1.HttpException("user already added ", 400);
        }
        ;
        followingUser.followers.push(user._id);
        await followingUser.save();
        return { status: "follow sent" };
    }
    ;
    async removeFollow(userId, user) {
        const followingUser = await this.Usermodel.findById(userId);
        if (!followingUser) {
            throw new common_1.HttpException("User not found", 400);
        }
        ;
        if (!followingUser.followers.includes(user._id)) {
            throw new common_1.HttpException("you are not in user followers list", 400);
        }
        ;
        followingUser.followers = followingUser.
            followers.filter(id => id.toString() != user._id.toString());
        await followingUser.save();
        return { status: "follow removed" };
    }
    ;
    async getUserFollowers(userId) {
        const followingUser = await this.Usermodel
            .findById(userId).populate("followers");
        if (!followingUser) {
            throw new common_1.HttpException("User not found", 400);
        }
        ;
        return { followers: followingUser.followers };
    }
    ;
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(models_1.Models.User)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model,
        nodemailer_service_1.mailerService])
], UserService);
;
//# sourceMappingURL=user.service.js.map