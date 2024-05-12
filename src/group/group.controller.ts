import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { GroupServices, mongodbId } from "./group.service";
import { CreateGroupDto } from "./dto/create.group.dto";
import { AuthUser } from "src/decorator/current.user";
import { UserDoc } from "src/schema.factory/user.schema";
import { Protected } from "src/guards/protect.user";
import { ParseMongoId } from "src/pipes/validate.mogoid";
import { UpdateGroupDto } from "./dto/update.group.dto";
import { FileInterceptorImage } from "src/interceptor/file.interceptor";
import { FileInterceptor } from "@nestjs/platform-express";



@Controller("group")
@UseGuards(Protected)
export class GroupController {
    constructor( private groupService:GroupServices ){};
    @Post()
    @UseInterceptors(FileInterceptor("image"),FileInterceptorImage)
    createGroup(@Body() body:CreateGroupDto,@AuthUser() user:UserDoc ){
        return this.groupService.createGroup(body,user);
    };
    @Patch("add-user/group/:groupId/user/:userId")
    addUserToGroup(
        @AuthUser() user:UserDoc,
        @Param("groupId",ParseMongoId) groupId:mongodbId,
        @Param("userId",ParseMongoId) userId:mongodbId
    ){
        return this.groupService.addUserToGroup(groupId,userId,user);
    };
    @Patch("leave-user/:groupId")
    leaveGroup(
        @AuthUser() user:UserDoc,
        @Param("groupId",ParseMongoId) groupId:mongodbId
    ){
        return this.groupService.leaveGroup(groupId,user);
    };
    @Patch("request/:groupId")
    requestToJoinGroup(
        @AuthUser() user:UserDoc,
        @Param("groupId",ParseMongoId) groupId:mongodbId
    ){
        return this.groupService.requestToJoinGroup(groupId,user);
    };
    @Patch("accept-request/group/:groupId/user/:userId")
    acceptRequestToJoinGroup(
        @AuthUser() user:UserDoc,
        @Param("groupId",ParseMongoId) groupId:mongodbId,
        @Param("userId",ParseMongoId) userId:mongodbId
    ){
        return this.groupService.acceptRequestToJoinGroup(groupId,userId,user);
    };
    @Patch("reject-request/group/:groupId/user/:userId")
    rejectRequestToJoinGroup(
        @AuthUser() user:UserDoc,
        @Param("groupId",ParseMongoId) groupId:mongodbId,
        @Param("userId",ParseMongoId) userId:mongodbId
    ){
        return this.groupService.rejectRequestToJoinGroup(groupId,userId,user);
    };
    @Get("member/:groupId")
    getGroupMembers(
        @AuthUser() user:UserDoc,
        @Param("groupId",ParseMongoId) groupId:mongodbId
    ){
        return this.groupService.getGroupMembers(groupId,user);
    };
    @Get("request/:groupId")
    getGroupRequests(
        @AuthUser() user:UserDoc,
        @Param("groupId",ParseMongoId) groupId:mongodbId
    ){
        return this.groupService.getGroupRequests(groupId,user);
    };
    @Patch("remove-member/group/:groupId/user/:userId")
    removeMemberFromGroup(
        @AuthUser() user:UserDoc,
        @Param("groupId",ParseMongoId) groupId:mongodbId,
        @Param("userId",ParseMongoId) userId:mongodbId
    ){
        return this.groupService.removeMemberFromGroup(groupId,userId,user);
    };
    @Patch("change-admin/group/:groupId/user/:userId")
    changeGroupAdmin(
        @AuthUser() user:UserDoc,
        @Param("groupId",ParseMongoId) groupId:mongodbId,
        @Param("userId",ParseMongoId) userId:mongodbId
    ){
        return this.groupService.changeGroupAdmin(groupId,userId,user);
    };
    @Get()
    getUserGroups(
        @AuthUser() user:UserDoc
    ){
        return this.groupService.getUserGroups(user);
    };
    @Get("search/:keyword")
    getGroupsByKeywords(
        @Param("keyword") keyword:string
    ){
        return this.groupService.searchGroups(keyword);
    };
    @Delete("/:groupId")
    deleteGroup(
        @AuthUser() user:UserDoc,
        @Param("groupId",ParseMongoId) groupId:mongodbId
    ){
        return this.groupService.deleteGroup(groupId,user);
    };
    @Patch("/:groupId")
    @UseInterceptors(FileInterceptor("image"),FileInterceptorImage)
    updateGroup(
        @AuthUser() user:UserDoc,
        @Body() body:UpdateGroupDto,
        @Param("groupId",ParseMongoId) groupId:mongodbId
    ){
        return this.groupService.updateGroup(body,groupId,user);
    };
};