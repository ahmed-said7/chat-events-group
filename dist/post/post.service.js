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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../enums/models");
;
;
;
;
;
let PostService = class PostService {
    constructor(postModel, groupModel) {
        this.postModel = postModel;
        this.groupModel = groupModel;
    }
    ;
    async createPost(body, user) {
        body.user = user._id;
        await this.validateGroup(body.group, user);
        const post = await this.postModel.create(body);
        return { post };
    }
    ;
    async deletePost(postId, user) {
        const post = await this.postModel.findOne({
            _id: postId
        });
        if (!post) {
            throw new common_1.HttpException("post not found", 400);
        }
        ;
        const groupExist = await this.groupModel.findOne({
            _id: post.group
        });
        if (groupExist.admin.toString() == user._id.toString()) {
            await post.deleteOne();
            return { status: "deleted" };
        }
        ;
        if (user._id.toString() != post.user.toString()) {
            throw new common_1.HttpException("you are not post owner", 400);
        }
        ;
        await post.deleteOne();
        return { status: "deleted" };
    }
    ;
    async updatePost(body, postId, user) {
        const post = await this.postModel.findOne({
            _id: postId
        });
        if (!post) {
            throw new common_1.HttpException("post not found", 400);
        }
        ;
        if (user._id.toString() != post.user.toString()) {
            throw new common_1.HttpException("you are not post owner", 400);
        }
        ;
        const updated = await this.postModel.findByIdAndUpdate(postId, body, { new: true });
        return { status: "updated", post: updated };
    }
    ;
    async getGroupPosts(groupId, user, page, limit) {
        const pagination = {};
        pagination.count = await this.postModel.countDocuments();
        pagination.currentPage = page || 1;
        pagination.limit = limit || 10;
        const skip = (pagination.currentPage - 1) * pagination.limit;
        if (page > 1) {
            pagination.previousPage = page - 1;
        }
        ;
        if (pagination.currentPage * pagination.limit < pagination.count) {
            pagination.nextPage = page + 1;
        }
        ;
        await this.validateGroup(groupId, user);
        const posts = await this.postModel.find({
            group: groupId
        })
            .populate("user")
            .sort("-createdAt")
            .skip(skip)
            .limit(pagination.limit);
        return { posts };
    }
    ;
    async addLike(postId, user) {
        const post = await this.postModel.findOne({
            _id: postId
        });
        if (!post) {
            throw new common_1.HttpException("post not found", 400);
        }
        ;
        await this.validateGroup(post.group, user);
        if (post.likes.includes(user._id)) {
            throw new common_1.HttpException("you have added like before", 400);
        }
        ;
        post.likes.push(user._id);
        await post.save();
        return { status: "like added", post };
    }
    ;
    async validateGroup(groupId, user) {
        const groupExist = await this.groupModel.findOne({
            _id: groupId
        });
        if (!groupExist) {
            throw new common_1.HttpException("group not found", 400);
        }
        ;
        if (!groupExist.users.includes(user._id)) {
            throw new common_1.HttpException("you are not group member", 400);
        }
        ;
        return groupExist;
    }
    ;
    async removeLike(postId, user) {
        const post = await this.postModel.findOne({
            _id: postId
        });
        if (!post) {
            throw new common_1.HttpException("post not found", 400);
        }
        ;
        await this.validateGroup(post.group, user);
        if (!post.likes.includes(user._id)) {
            throw new common_1.HttpException("you have not added like before", 400);
        }
        ;
        post.likes =
            post.likes.filter((id) => id.toString() != user._id.toString());
        await post.save();
        return { status: "like removed", post };
    }
    ;
    async getLikes(postId, user) {
        const post = await this.postModel.findOne({
            _id: postId
        }).populate("likes");
        if (!post) {
            throw new common_1.HttpException("post not found", 400);
        }
        ;
        await this.validateGroup(post.group, user);
        return { likes: post.likes };
    }
    ;
    async addComment(body, postId, user) {
        const post = await this.postModel.findOne({
            _id: postId
        });
        if (!post) {
            throw new common_1.HttpException("post not found", 400);
        }
        ;
        await this.validateGroup(post.group, user);
        post.comments.push({ content: body.content, user: user._id });
        await post.save();
        return { status: "comment added", comment: post.comments[post.comments.length - 1] };
    }
    ;
    async removeComment(postId, commentId, user) {
        const post = await this.postModel.findOne({
            _id: postId
        });
        if (!post) {
            throw new common_1.HttpException("post not found", 400);
        }
        ;
        const group = await this.validateGroup(post.group, user);
        const index = post.comments
            .findIndex(({ _id }) => _id.toString() == commentId.toString());
        if (index == -1) {
            throw new common_1.HttpException("No comment found", 400);
        }
        ;
        if (group.admin.toString() == user._id.toString() ||
            post.comments[index].user.toString() == user._id.toString()) {
            post.comments.splice(index, 1);
            await post.save();
            return { status: "deleted", post };
        }
        else {
            throw new common_1.HttpException("you are not allowed to delete a comment", 400);
        }
        ;
    }
    ;
    async updateComment(body, postId, commentId, user) {
        const post = await this.postModel.findOne({
            _id: postId
        });
        if (!post) {
            throw new common_1.HttpException("post not found", 400);
        }
        ;
        await this.validateGroup(post.group, user);
        const index = post.comments
            .findIndex(({ _id }) => _id.toString() == commentId.toString());
        if (index == -1) {
            throw new common_1.HttpException("No comment found", 400);
        }
        ;
        if (post.comments[index].user.toString() == user._id.toString()) {
            post.comments[index].content = body.content;
            await post.save();
            return { status: "updated", comment: post.comments[index] };
        }
        else {
            throw new common_1.HttpException("you are not allowed to update a comment", 400);
        }
        ;
    }
    ;
    async getComments(postId, user) {
        const post = await this.postModel.findOne({
            _id: postId
        }).populate("comments.user");
        if (!post) {
            throw new common_1.HttpException("post not found", 400);
        }
        ;
        await this.validateGroup(post.group, user);
        return { comments: post.comments };
    }
    ;
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.Models.Post)),
    __param(1, (0, mongoose_1.InjectModel)(models_1.Models.Group)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], PostService);
;
//# sourceMappingURL=post.service.js.map