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
exports.GroupServices = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../enums/models");
;
;
let GroupServices = class GroupServices {
    constructor(groupModel, userModel) {
        this.groupModel = groupModel;
        this.userModel = userModel;
    }
    ;
    async createGroup(body, user) {
        const users = await this.userModel.find({
            _id: { $in: body.users }
        });
        if (users.length !== body.users.length) {
            throw new common_1.HttpException("invalid user id", 400);
        }
        ;
        if (!body.users.includes(user._id)) {
            body.users.push(user._id);
        }
        ;
        const group = await this.groupModel.create({
            ...body,
            admin: user._id
        });
        return { group };
    }
    ;
    async leaveGroup(groupId, user) {
        const group = await this.groupModel.findOne({ _id: groupId });
        if (!group) {
            throw new common_1.HttpException("Group not found", 400);
        }
        ;
        if (group.admin.toString() == user._id.toString()) {
            throw new common_1.HttpException("you are group owner", 400);
        }
        ;
        if (!group.users.includes(user._id)) {
            throw new common_1.HttpException("you are not group member", 400);
        }
        ;
        group.users = group.users.filter((id) => id.toString() != user._id.toString());
        await group.save();
        return { status: "user leaved group" };
    }
    ;
    async addUserToGroup(groupId, userId, user) {
        const userExists = await this.userModel.findOne({ _id: userId });
        if (!userExists) {
            throw new common_1.HttpException("user not found", 400);
        }
        ;
        const group = await this.groupModel.findOne({ _id: groupId });
        if (!group) {
            throw new common_1.HttpException("Group not found", 400);
        }
        ;
        if (group.admin.toString() != user._id.toString()) {
            throw new common_1.HttpException("you are not group admin", 400);
        }
        ;
        if (group.users.includes(userExists._id)) {
            throw new common_1.HttpException("user already join group", 400);
        }
        ;
        group.users.push(userExists._id);
        await group.save();
        return { status: "user added to group" };
    }
    ;
    async requestToJoinGroup(groupId, user) {
        const group = await this.groupModel.findOne({ _id: groupId });
        if (!group) {
            throw new common_1.HttpException("Group not found", 400);
        }
        ;
        console.log(group);
        if (group.users.includes(user._id)) {
            throw new common_1.HttpException("user already join group", 400);
        }
        ;
        if (group.requests.includes(user._id)) {
            throw new common_1.HttpException("user already sent request to join group", 400);
        }
        ;
        group.requests.push(user._id);
        await group.save();
        return { status: "request to join group" };
    }
    ;
    async acceptRequestToJoinGroup(groupId, userId, user) {
        const userExists = await this.userModel.findOne({ _id: userId });
        if (!userExists) {
            throw new common_1.HttpException("user not found", 400);
        }
        ;
        const group = await this.groupModel.findOne({ _id: groupId });
        if (!group) {
            throw new common_1.HttpException("Group not found", 400);
        }
        ;
        if (group.admin.toString() != user._id.toString()) {
            throw new common_1.HttpException("you are not group admin", 400);
        }
        ;
        if (group.users.includes(userId)) {
            throw new common_1.HttpException("user already join group", 400);
        }
        ;
        if (!group.requests.includes(userExists._id)) {
            throw new common_1.HttpException("user does not sent any request", 400);
        }
        ;
        group.users.push(userExists._id);
        group.requests = group.requests.filter((id) => id.toString() != userExists._id.toString());
        await group.save();
        return { status: "request accepted" };
    }
    ;
    async rejectRequestToJoinGroup(groupId, userId, user) {
        const group = await this.groupModel.findOne({ _id: groupId });
        if (!group) {
            throw new common_1.HttpException("Group not found", 400);
        }
        ;
        if (group.admin.toString() != user._id.toString()) {
            throw new common_1.HttpException("you are not group admin", 400);
        }
        ;
        if (!group.requests.includes(userId)) {
            throw new common_1.HttpException("user does not sent any request", 400);
        }
        ;
        group.requests = group.requests.filter((id) => id.toString() != userId.toString());
        await group.save();
        return { status: "request rejected" };
    }
    ;
    async changeGroupAdmin(groupId, userId, user) {
        const userExists = await this.userModel.findOne({ _id: userId });
        if (!userExists) {
            throw new common_1.HttpException("user not found", 400);
        }
        ;
        const group = await this.groupModel.findOne({ _id: groupId });
        if (!group) {
            throw new common_1.HttpException("Group not found", 400);
        }
        ;
        if (group.admin.toString() != user._id.toString()) {
            throw new common_1.HttpException("you are not group admin", 400);
        }
        ;
        if (userId.toString() == user._id.toString()) {
            throw new common_1.HttpException("you are already group owner", 400);
        }
        ;
        if (!group.users.includes(userExists._id)) {
            throw new common_1.HttpException("user is not group memeber", 400);
        }
        ;
        group.admin = userExists._id;
        await group.save();
        return { status: "group admin changed" };
    }
    ;
    async removeMemberFromGroup(groupId, userId, user) {
        const userExists = await this.userModel.findOne({ _id: userId });
        if (!userExists) {
            throw new common_1.HttpException("user not found", 400);
        }
        ;
        const group = await this.groupModel.findOne({ _id: groupId });
        if (!group) {
            throw new common_1.HttpException("Group not found", 400);
        }
        ;
        if (group.admin.toString() != user._id.toString()) {
            throw new common_1.HttpException("you are not group admin", 400);
        }
        ;
        if (userId.toString() == user._id.toString()) {
            throw new common_1.HttpException("can not remove group owner", 400);
        }
        ;
        if (!group.users.includes(userExists._id)) {
            throw new common_1.HttpException("user is not group member", 400);
        }
        ;
        group.users = group.users.filter((id) => id.toString() != userId.toString());
        await group.save();
        return { status: "member removed" };
    }
    ;
    async getUserGroups(user) {
        const groups = await this.groupModel.find({
            "users": user._id
        });
        return { groups };
    }
    ;
    async searchGroups(keyword) {
        const groups = await this.groupModel.find({
            $text: {
                $search: keyword
            }
        });
        return { groups };
    }
    ;
    async updateGroup(body, groupId, user) {
        const group = await this.groupModel.findOne({ _id: groupId });
        if (!group) {
            throw new common_1.HttpException("Group not found", 400);
        }
        ;
        if (group.admin.toString() != user._id.toString()) {
            throw new common_1.HttpException("you are not group admin", 400);
        }
        ;
        const updatedGroup = await this.groupModel.findByIdAndUpdate(groupId, body, { new: true });
        return { group: updatedGroup };
    }
    ;
    async deleteGroup(groupId, user) {
        const group = await this.groupModel.findOne({ _id: groupId });
        if (!group) {
            throw new common_1.HttpException("Group not found", 400);
        }
        ;
        if (group.admin.toString() != user._id.toString()) {
            throw new common_1.HttpException("you are not group admin", 400);
        }
        ;
        await group.deleteOne();
        return { status: "deleted" };
    }
    ;
    async getGroupRequests(groupId, user) {
        const group = await this.groupModel.findOne({ _id: groupId })
            .populate({ path: "requests", select: "name image" });
        if (!group) {
            throw new common_1.HttpException("Group not found", 400);
        }
        ;
        if (group.admin.toString() != user._id.toString()) {
            throw new common_1.HttpException("you are not group admin", 400);
        }
        ;
        return { requests: group.requests };
    }
    ;
    async getGroupMembers(groupId, user) {
        const group = await this.groupModel.findOne({ _id: groupId })
            .populate({ path: "users", select: "name image" })
            .populate({ path: "admin", select: "name image" });
        if (!group) {
            throw new common_1.HttpException("Group not found", 400);
        }
        ;
        if (!group.users.includes(user._id)) {
            throw new common_1.HttpException("user is not group member", 400);
        }
        ;
        return { users: group.users, admin: group.admin };
    }
    ;
};
exports.GroupServices = GroupServices;
exports.GroupServices = GroupServices = __decorate([
    __param(0, (0, mongoose_1.InjectModel)(models_1.Models.Group)),
    __param(1, (0, mongoose_1.InjectModel)(models_1.Models.User)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], GroupServices);
;
//# sourceMappingURL=group.service.js.map