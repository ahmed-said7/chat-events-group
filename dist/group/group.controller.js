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
exports.GroupController = void 0;
const common_1 = require("@nestjs/common");
const group_service_1 = require("./group.service");
const create_group_dto_1 = require("./dto/create.group.dto");
const current_user_1 = require("../decorator/current.user");
const protect_user_1 = require("../guards/protect.user");
const validate_mogoid_1 = require("../pipes/validate.mogoid");
const update_group_dto_1 = require("./dto/update.group.dto");
const file_interceptor_1 = require("../interceptor/file.interceptor");
const platform_express_1 = require("@nestjs/platform-express");
let GroupController = class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    ;
    createGroup(body, user) {
        return this.groupService.createGroup(body, user);
    }
    ;
    addUserToGroup(user, groupId, userId) {
        return this.groupService.addUserToGroup(groupId, userId, user);
    }
    ;
    leaveGroup(user, groupId) {
        return this.groupService.leaveGroup(groupId, user);
    }
    ;
    requestToJoinGroup(user, groupId) {
        return this.groupService.requestToJoinGroup(groupId, user);
    }
    ;
    acceptRequestToJoinGroup(user, groupId, userId) {
        return this.groupService.acceptRequestToJoinGroup(groupId, userId, user);
    }
    ;
    rejectRequestToJoinGroup(user, groupId, userId) {
        return this.groupService.rejectRequestToJoinGroup(groupId, userId, user);
    }
    ;
    getGroupMembers(user, groupId) {
        return this.groupService.getGroupMembers(groupId, user);
    }
    ;
    getGroupRequests(user, groupId) {
        return this.groupService.getGroupRequests(groupId, user);
    }
    ;
    removeMemberFromGroup(user, groupId, userId) {
        return this.groupService.removeMemberFromGroup(groupId, userId, user);
    }
    ;
    changeGroupAdmin(user, groupId, userId) {
        return this.groupService.changeGroupAdmin(groupId, userId, user);
    }
    ;
    getUserGroups(user) {
        return this.groupService.getUserGroups(user);
    }
    ;
    getGroupsByKeywords(keyword) {
        return this.groupService.searchGroups(keyword);
    }
    ;
    deleteGroup(user, groupId) {
        return this.groupService.deleteGroup(groupId, user);
    }
    ;
    updateGroup(user, body, groupId) {
        return this.groupService.updateGroup(body, groupId, user);
    }
    ;
};
exports.GroupController = GroupController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.FileInterceptorImage),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_group_dto_1.CreateGroupDto, Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "createGroup", null);
__decorate([
    (0, common_1.Patch)("add-user/group/:groupId/user/:userId"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("groupId", validate_mogoid_1.ParseMongoId)),
    __param(2, (0, common_1.Param)("userId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "addUserToGroup", null);
__decorate([
    (0, common_1.Patch)("leave-user/:groupId"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("groupId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "leaveGroup", null);
__decorate([
    (0, common_1.Patch)("request/:groupId"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("groupId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "requestToJoinGroup", null);
__decorate([
    (0, common_1.Patch)("accept-request/group/:groupId/user/:userId"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("groupId", validate_mogoid_1.ParseMongoId)),
    __param(2, (0, common_1.Param)("userId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "acceptRequestToJoinGroup", null);
__decorate([
    (0, common_1.Patch)("reject-request/group/:groupId/user/:userId"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("groupId", validate_mogoid_1.ParseMongoId)),
    __param(2, (0, common_1.Param)("userId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "rejectRequestToJoinGroup", null);
__decorate([
    (0, common_1.Get)("member/:groupId"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("groupId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getGroupMembers", null);
__decorate([
    (0, common_1.Get)("request/:groupId"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("groupId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getGroupRequests", null);
__decorate([
    (0, common_1.Patch)("remove-member/group/:groupId/user/:userId"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("groupId", validate_mogoid_1.ParseMongoId)),
    __param(2, (0, common_1.Param)("userId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "removeMemberFromGroup", null);
__decorate([
    (0, common_1.Patch)("change-admin/group/:groupId/user/:userId"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("groupId", validate_mogoid_1.ParseMongoId)),
    __param(2, (0, common_1.Param)("userId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "changeGroupAdmin", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getUserGroups", null);
__decorate([
    (0, common_1.Get)("search/:keyword"),
    __param(0, (0, common_1.Param)("keyword")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "getGroupsByKeywords", null);
__decorate([
    (0, common_1.Delete)("/:groupId"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("groupId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "deleteGroup", null);
__decorate([
    (0, common_1.Patch)("/:groupId"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.FileInterceptorImage),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)("groupId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_group_dto_1.UpdateGroupDto, Object]),
    __metadata("design:returntype", void 0)
], GroupController.prototype, "updateGroup", null);
exports.GroupController = GroupController = __decorate([
    (0, common_1.Controller)("group"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __metadata("design:paramtypes", [group_service_1.GroupServices])
], GroupController);
;
//# sourceMappingURL=group.controller.js.map