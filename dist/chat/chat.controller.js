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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
const create_chat_1 = require("./dto/create.chat");
const current_user_1 = require("../decorator/current.user");
const protect_user_1 = require("../guards/protect.user");
const validate_mogoid_1 = require("../pipes/validate.mogoid");
const update_chat_1 = require("./dto/update.chat");
const file_interceptor_1 = require("../interceptor/file.interceptor");
const platform_express_1 = require("@nestjs/platform-express");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    ;
    createChat(body, user) {
        return this.chatService.createChat(body, user);
    }
    ;
    getUserChats(user) {
        return this.chatService.getChats(user);
    }
    ;
    deleteChat(id, user) {
        return this.chatService.deleteChat(id, user);
    }
    ;
    getChatMembers(id, user) {
        return this.chatService.getChatMemebers(id, user);
    }
    ;
    updateChat(body, id, user) {
        return this.chatService.updateChat(id, body, user);
    }
    ;
};
exports.ChatController = ChatController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.FileInterceptorImage),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_1.CreateChatDto, Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "createChat", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getUserChats", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "deleteChat", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "getChatMembers", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.FileInterceptorImage),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("id", validate_mogoid_1.ParseMongoId)),
    __param(2, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_chat_1.UpdateChatDto, Object, Object]),
    __metadata("design:returntype", void 0)
], ChatController.prototype, "updateChat", null);
exports.ChatController = ChatController = __decorate([
    (0, common_1.Controller)("chat"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
;
//# sourceMappingURL=chat.controller.js.map