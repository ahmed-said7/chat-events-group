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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const protect_user_1 = require("../guards/protect.user");
const create_message_dto_1 = require("./dto/create.message.dto");
const current_user_1 = require("../decorator/current.user");
const message_service_1 = require("./message.service");
const validate_mogoid_1 = require("../pipes/validate.mogoid");
const update_message_dto_1 = require("./dto/update.message.dto");
const file_interceptor_1 = require("../interceptor/file.interceptor");
const platform_express_1 = require("@nestjs/platform-express");
let MessageController = class MessageController {
    constructor(msgService) {
        this.msgService = msgService;
    }
    ;
    createMessage(body, user) {
        return this.msgService.createMessage(body, user);
    }
    ;
    getChatMessages(chatId, user) {
        return this.msgService.getChatMessages(chatId, user);
    }
    ;
    updateMessage(messageId, body, user) {
        return this.msgService.updateMessage(messageId, body, user);
    }
    ;
    deleteMessages(messageId, user) {
        return this.msgService.deleteMessage(messageId, user);
    }
    ;
};
exports.MessageController = MessageController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.FileInterceptorImage),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto, Object]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Get)(":chatId"),
    __param(0, (0, common_1.Param)("chatId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "getChatMessages", null);
__decorate([
    (0, common_1.Patch)(":messageId"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.FileInterceptorImage),
    __param(0, (0, common_1.Param)("messageId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_message_dto_1.UpdateMessageDto, Object]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "updateMessage", null);
__decorate([
    (0, common_1.Delete)(":messageId"),
    __param(0, (0, common_1.Param)("messageId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "deleteMessages", null);
exports.MessageController = MessageController = __decorate([
    (0, common_1.Controller)("message"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
;
//# sourceMappingURL=message.controller.js.map