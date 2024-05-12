import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { Protected } from "src/guards/protect.user";
import { CreateMessageDto } from "./dto/create.message.dto";
import { AuthUser } from "src/decorator/current.user";
import { UserDoc } from "src/schema.factory/user.schema";
import { ChatService } from "src/chat/chat.service";
import { MessageService } from "./message.service";
import { ParseMongoId } from "src/pipes/validate.mogoid";
import { mongodbId } from "src/group/group.service";
import { UpdateMessageDto } from "./dto/update.message.dto";
import { FileInterceptorImage } from "src/interceptor/file.interceptor";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("message")
@UseGuards(Protected)
export class MessageController {
    constructor(
        private msgService: MessageService
    ){};
    @Post()
    @UseInterceptors(FileInterceptor("image"),FileInterceptorImage)
    createMessage(
        @Body() body:CreateMessageDto ,
        @AuthUser() user:UserDoc
    ){
        return this.msgService.createMessage(body,user);
    };
    @Get(":chatId")
    getChatMessages(
        @Param("chatId",ParseMongoId) chatId:mongodbId ,
        @AuthUser() user:UserDoc
    ){
        return this.msgService.getChatMessages(chatId,user);
    };
    @Patch(":messageId")
    @UseInterceptors(FileInterceptor("image"),FileInterceptorImage)
    updateMessage(
        @Param("messageId",ParseMongoId) messageId:mongodbId ,
        @Body() body:UpdateMessageDto,
        @AuthUser() user:UserDoc
    ){
        return this.msgService.updateMessage(messageId,body,user);
    };
    @Delete(":messageId")
    deleteMessages(
        @Param("messageId",ParseMongoId) messageId:mongodbId ,
        @AuthUser() user:UserDoc
    ){
        return this.msgService.deleteMessage(messageId,user);
    };
};