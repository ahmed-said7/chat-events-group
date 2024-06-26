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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./post.service");
const protect_user_1 = require("../guards/protect.user");
const current_user_1 = require("../decorator/current.user");
const post_create_dto_1 = require("./dto/post.create.dto");
const validate_mogoid_1 = require("../pipes/validate.mogoid");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const post_update_dto_1 = require("./dto/post.update.dto");
const comment_create_dto_1 = require("./dto/comment.create.dto");
const file_interceptor_1 = require("../interceptor/file.interceptor");
const platform_express_1 = require("@nestjs/platform-express");
class QueryDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => { return parseInt(value); }),
    __metadata("design:type", Number)
], QueryDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => { return parseInt(value); }),
    __metadata("design:type", Number)
], QueryDto.prototype, "limit", void 0);
;
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    ;
    getPostComments(user, postId) {
        return this.postService.getComments(postId, user);
    }
    ;
    addPostComment(body, user, postId) {
        return this.postService.addComment(body, postId, user);
    }
    ;
    updatePostComment(body, user, postId, commentId) {
        return this.postService.updateComment(body, postId, commentId, user);
    }
    ;
    deletePostComment(user, postId, commentId) {
        return this.postService.removeComment(postId, commentId, user);
    }
    ;
    addLike(user, postId) {
        return this.postService.addLike(postId, user);
    }
    ;
    removeLike(user, postId) {
        return this.postService.removeLike(postId, user);
    }
    ;
    getLike(user, postId) {
        return this.postService.getLikes(postId, user);
    }
    ;
    createPost(user, body) {
        return this.postService.createPost(body, user);
    }
    ;
    getGroupPosts(user, groupId, query) {
        return this.postService
            .getGroupPosts(groupId, user, query.page, query.limit);
    }
    ;
    deletePost(user, postId) {
        return this.postService.deletePost(postId, user);
    }
    ;
    updatePost(user, postId, body) {
        return this.postService.updatePost(body, postId, user);
    }
    ;
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Get)("comments/:id"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("id", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getPostComments", null);
__decorate([
    (0, common_1.Post)("comments/:id"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_1.AuthUser)()),
    __param(2, (0, common_1.Param)("id", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_create_dto_1.CreateCommentDto, Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "addPostComment", null);
__decorate([
    (0, common_1.Patch)("comments/post/:postId/comment/:commentId"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_1.AuthUser)()),
    __param(2, (0, common_1.Param)("postId", validate_mogoid_1.ParseMongoId)),
    __param(3, (0, common_1.Param)("commentId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_create_dto_1.CreateCommentDto, Object, Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "updatePostComment", null);
__decorate([
    (0, common_1.Delete)("comments/post/:postId/comment/:commentId"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("postId", validate_mogoid_1.ParseMongoId)),
    __param(2, (0, common_1.Param)("commentId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "deletePostComment", null);
__decorate([
    (0, common_1.Post)("likes/:postId"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("postId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "addLike", null);
__decorate([
    (0, common_1.Delete)("likes/:postId"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("postId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "removeLike", null);
__decorate([
    (0, common_1.Get)("likes/:postId"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("postId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getLike", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.FileInterceptorImage),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, post_create_dto_1.CreatePostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("id", validate_mogoid_1.ParseMongoId)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, QueryDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getGroupPosts", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("id", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.FileInterceptorImage),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("id", validate_mogoid_1.ParseMongoId)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, post_update_dto_1.UpdatePostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "updatePost", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)("post"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
;
//# sourceMappingURL=post.controller.js.map