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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../enums/models");
;
;
let ChatService = class ChatService {
    constructor(chatModel, userModel) {
        this.chatModel = chatModel;
        this.userModel = userModel;
    }
    ;
    async createChat(body, user) {
        body.admin = user._id;
        const userExist = await this.userModel.findOne({ _id: body.user });
        if (!userExist) {
            throw new common_1.HttpException("user not found", 400);
        }
        ;
        const chatExist = await this.chatModel.findOne({
            $or: [
                { user: body.admin, admin: body.user },
                { admin: body.admin, user: body.user }
            ]
        });
        if (chatExist) {
            throw new common_1.HttpException("chat already exists", 400);
        }
        ;
        const chat = await this.chatModel.create(body);
        return { chat };
    }
    ;
    async updateChat(chatId, body, user) {
        const chatExist = await this.chatModel.findOne({
            $or: [
                { _id: chatId, user: user._id },
                { _id: chatId, admin: user._id }
            ]
        });
        if (!chatExist) {
            throw new common_1.HttpException("chat not found", 400);
        }
        ;
        const chat = await this.chatModel.findByIdAndUpdate(chatId, body, { new: true });
        return { chat };
    }
    ;
    async getChats(user) {
        const chats = await this.chatModel.find({
            $or: [
                { user: user._id },
                { admin: user._id }
            ]
        }).populate({
            path: "lastMessage",
            populate: {
                path: "user",
                model: models_1.Models.User
            }
        });
        return { chats };
    }
    ;
    async deleteChat(chatId, user) {
        const chatExist = await this.chatModel.findOne({
            $or: [
                { _id: chatId, user: user._id },
                { _id: chatId, admin: user._id }
            ]
        });
        if (!chatExist) {
            throw new common_1.HttpException("chat not found", 400);
        }
        ;
        await chatExist.deleteOne();
        return { status: "deleted" };
    }
    ;
    async getChatMemebers(chatId, user) {
        const chat = await this.chatModel.findOne({
            $or: [
                { _id: chatId, user: user._id },
                { _id: chatId, admin: user._id }
            ]
        }).populate(["user", "admin"]);
        if (!chat) {
            throw new common_1.HttpException("No chat found", 400);
        }
        return { admin: chat.admin, user: chat.user };
    }
    ;
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.Models.Chat)),
    __param(1, (0, mongoose_1.InjectModel)(models_1.Models.User)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ChatService);
;
//# sourceMappingURL=chat.service.js.map