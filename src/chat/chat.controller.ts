import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create.chat";
import { AuthUser } from "src/decorator/current.user";
import { UserDoc } from "src/schema.factory/user.schema";
import { Protected } from "src/guards/protect.user";
import { mongodbId } from "src/group/group.service";
import { ParseMongoId } from "src/pipes/validate.mogoid";
import { UpdateChatDto } from "./dto/update.chat";

@Controller("chat")
@UseGuards(Protected)
export class ChatController {

    constructor(private chatService: ChatService){};

    @Post()
    createChat(
        @Body() body:CreateChatDto,
        @AuthUser() user:UserDoc
    ){
        return this.chatService.createChat(body, user);
    };

    @Get()
    getUserChats(
        @AuthUser() user:UserDoc
    ){
        return this.chatService.getChats(user);
    };

    @Delete(":id")
    deleteChat(
        @Param("id",ParseMongoId) id:mongodbId,
        @AuthUser() user:UserDoc
    ){
        return this.chatService.deleteChat(id, user)
    };

    @Get(":id")
    getChatMembers(
        @Param("id",ParseMongoId) id:mongodbId,
        @AuthUser() user:UserDoc
    ){
        return this.chatService.getChatMemebers(id, user)
    };

    @Patch(":id")
    updateChat(
        @Body() body:UpdateChatDto,
        @Param("id",ParseMongoId) id:mongodbId,
        @AuthUser() user:UserDoc
    ){
        return this.chatService.updateChat(id,body,user);
    };

}; 