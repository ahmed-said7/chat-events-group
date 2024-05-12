import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { GroupServices, mongodbId } from "./group.service";
import { CreateGroupDto } from "./dto/create.group.dto";
import { AuthUser } from "src/decorator/current.user";
import { UserDoc } from "src/schema.factory/user.schema";
import { Protected } from "src/guards/protect.user";
import { ParseMongoId } from "src/pipes/validate.mogoid";
import { UpdateGroupDto } from "./dto/update.group.dto";



@Controller("group")
@UseGuards(Protected)
export class GroupController {
    constructor( private groupService:GroupServices ){};
    @Post()
    createGroup(@Body() body:CreateGroupDto,@AuthUser() user:UserDoc ){
        return this.groupService.createGroup(body,user);
    };
    @Patch("add-user/:groupId/:userId")
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
    @Patch("accept-request/:groupId/:userId")
    acceptRequestToJoinGroup(
        @AuthUser() user:UserDoc,
        @Param("groupId",ParseMongoId) groupId:mongodbId,
        @Param("userId",ParseMongoId) userId:mongodbId
    ){
        return this.groupService.acceptRequestToJoinGroup(groupId,userId,user);
    };
    @Patch("reject-request/:groupId/:userId")
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
    @Patch("remove-member/:groupId/:userId")
    removeMemberFromGroup(
        @AuthUser() user:UserDoc,
        @Param("groupId",ParseMongoId) groupId:mongodbId,
        @Param("userId",ParseMongoId) userId:mongodbId
    ){
        return this.groupService.removeMemberFromGroup(groupId,userId,user);
    };
    @Patch("change-admin/:groupId/:userId")
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
    updateGroup(
        @AuthUser() user:UserDoc,
        @Body() body:UpdateGroupDto,
        @Param("groupId",ParseMongoId) groupId:mongodbId
    ){
        return this.groupService.updateGroup(body,groupId,user);
    };
};