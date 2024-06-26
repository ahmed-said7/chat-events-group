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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const login_dto_1 = require("./dto/login.dto");
const signup_dto_1 = require("./dto/signup.dto");
const protect_user_1 = require("../guards/protect.user");
const update_password_dto_1 = require("./dto/update.password.dto");
const current_user_1 = require("../decorator/current.user");
const update_user_dto_1 = require("./dto/update.user.dto");
const validate_mogoid_1 = require("../pipes/validate.mogoid");
const platform_express_1 = require("@nestjs/platform-express");
const file_interceptor_1 = require("../interceptor/file.interceptor");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    ;
    login(body) {
        return this.userService.login(body);
    }
    ;
    signup(body) {
        return this.userService.signup(body);
    }
    ;
    updatePassword(body, user) {
        return this.userService.updatepassword(body, user);
    }
    ;
    sendVerificationToEmail(user) {
        return this.userService.createEmailVerificationCode(user);
    }
    ;
    verifyUserEmail(code) {
        return this.userService.verifyEmail(code);
    }
    ;
    forgetPassowrd(body) {
        return this.userService.forgetPassword(body.email);
    }
    ;
    changePassword(body) {
        return this.userService.changePassword(body);
    }
    ;
    verifyResetCode(code) {
        return this.userService.vertfyResetCode(code);
    }
    ;
    deleteUser(user) {
        return this.userService.deleteUser(user);
    }
    ;
    getUser(user) {
        return this.userService.getUser(user);
    }
    ;
    updateUser(user, body) {
        return this.userService.updateUser(body, user);
    }
    ;
    getUsers(keyword) {
        return this.userService.getUsersBySearchName(keyword);
    }
    ;
    getOneUser(userId) {
        return this.userService.getOneUser(userId);
    }
    ;
    addFollow(userId, user) {
        return this.userService.addFollow(userId, user);
    }
    ;
    removeFollow(userId, user) {
        return this.userService.removeFollow(userId, user);
    }
    ;
    getUserFollowings(userId) {
        return this.userService.getUserFollowers(userId);
    }
    ;
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)("auth/login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)("auth/signup"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "signup", null);
__decorate([
    (0, common_1.Patch)("user/password"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_password_dto_1.UpdatePasswordDto, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Get)("user/verify"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "sendVerificationToEmail", null);
__decorate([
    (0, common_1.Patch)("auth/verify/:code"),
    __param(0, (0, common_1.Param)("code")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "verifyUserEmail", null);
__decorate([
    (0, common_1.Patch)('auth/forget-pass'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.forgetPassowrdBody]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "forgetPassowrd", null);
__decorate([
    (0, common_1.Patch)('auth/update-pass'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_password_dto_1.changePasswordDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Patch)('auth/code/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "verifyResetCode", null);
__decorate([
    (0, common_1.Delete)("user"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)("user"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Patch)("user"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.FileInterceptorImage),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Get)("search/:keyword"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("keyword")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)("user/:id"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("id", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getOneUser", null);
__decorate([
    (0, common_1.Post)("user/follow/:userId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("userId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "addFollow", null);
__decorate([
    (0, common_1.Delete)("user/follow/:userId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("userId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "removeFollow", null);
__decorate([
    (0, common_1.Delete)("user/follow/:userId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("userId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserFollowings", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
;
//# sourceMappingURL=user.controller.js.map