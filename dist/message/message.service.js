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
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../enums/models");
;
;
let MessageService = class MessageService {
    constructor(chatModel, msgModel) {
        this.chatModel = chatModel;
        this.msgModel = msgModel;
    }
    ;
    async createMessage(body, user) {
        if (!body.content && !body.image) {
            throw new common_1.HttpException("content or image is required", 400);
        }
        ;
        const chat = await this.validateChat(body.chat, user);
        body.user = user._id;
        const message = await this.msgModel.create(body);
        chat.lastMessage = message._id;
        await chat.save();
        return { message };
    }
    ;
    async deleteMessage(messageId, user) {
        const message = await this.msgModel.findById(messageId);
        if (!message) {
            throw new common_1.HttpException("message not found", 400);
        }
        ;
        if (message.user.toString() != user._id.toString()) {
            throw new common_1.HttpException("you are not message sender", 400);
        }
        ;
        const chat = await this.chatModel.findOne({ _id: message.chat });
        if (chat.lastMessage.toString() == messageId.toString()) {
            chat.lastMessage = (await this.msgModel.find({
                chat: message.chat
            }).sort("-createdAt"))[1]._id;
        }
        ;
        await message.deleteOne();
        return { status: "deleted", message };
    }
    ;
    async updateMessage(messageId, body, user) {
        const message = await this.msgModel.findById(messageId);
        if (!message) {
            throw new common_1.HttpException("message not found", 400);
        }
        ;
        if (message.user.toString() != user._id.toString()) {
            throw new common_1.HttpException("you are not message sender", 400);
        }
        ;
        const updated = await this.msgModel.findByIdAndUpdate(messageId, body, { new: true });
        return { status: "updated", message: updated };
    }
    ;
    async validateChat(chatId, user) {
        const chat = await this.chatModel.findById(chatId);
        if (!chat) {
            throw new common_1.HttpException("chat not found", 400);
        }
        ;
        if (chat.user.toString() != user._id.toString()
            &&
                chat.admin.toString() != user._id.toString()) {
            throw new common_1.HttpException("you are not chat member", 400);
        }
        ;
        return chat;
    }
    ;
    async getChatMessages(chatId, user) {
        await this.validateChat(chatId, user);
        const messages = await this.msgModel.find({
            chat: chatId
        })
            .sort("-createdAt")
            .populate("user");
        return { messages };
    }
    ;
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.Models.Chat)),
    __param(1, (0, mongoose_1.InjectModel)(models_1.Models.Message)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], MessageService);
;
//# sourceMappingURL=message.service.js.map