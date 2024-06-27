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
exports.FeedService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../enums/models");
let FeedService = class FeedService {
    constructor(postModel, groupModel, eventModel, providerModel) {
        this.postModel = postModel;
        this.groupModel = groupModel;
        this.eventModel = eventModel;
        this.providerModel = providerModel;
    }
    ;
    async getFeed(user, page) {
        const groupIds = (await this.groupModel.find({ "users": user._id })).map(({ _id }) => _id);
        let limit = 5;
        let skipRate = parseInt(page) - 1 || 0;
        const postsCount = await this.postModel.find({ group: { $in: groupIds } }).countDocuments();
        const eventCount = await this.eventModel.countDocuments();
        const sum = postsCount + eventCount;
        const postLimit = Math.floor(((postsCount / sum) * 100) / limit);
        const eventLimit = Math.floor(((eventCount / sum) * 100) / limit);
        const posts = await this.postModel
            .find({ group: { $in: groupIds } })
            .populate([
            { path: "user", select: "name image" },
            { path: "user", select: "name image" }
        ])
            .sort("-createdAt")
            .skip(skipRate * postLimit).limit(postLimit);
        const events = await this.eventModel.find()
            .populate({ path: "admin", select: "name image" })
            .sort("-createdAt").skip(skipRate * eventLimit).limit(eventLimit);
        user.lastSeen = new Date();
        await user.save();
        return { posts, events };
    }
    ;
    async getNewFeed(user) {
        if (!user.lastSeen) {
            return this.getFeed(user);
        }
        ;
        const groupIds = (await this.groupModel.find({ "users": user._id }).select("_id"))
            .map(({ _id }) => _id);
        const posts = await this.postModel.find({
            group: { $in: groupIds },
            $or: [{ createdAt: { $gt: user.lastSeen } }, { updatedAt: { $gt: user.lastSeen } }]
        })
            .populate([
            { path: "user", select: "name image" },
            { path: "user", select: "name image" }
        ])
            .sort("-createdAt").limit(6);
        const events = await this.eventModel
            .find({ $or: [{ createdAt: { $gt: user.lastSeen } }, { updatedAt: { $gt: user.lastSeen } }] })
            .populate({ path: "admin", select: "name image" }).sort("-createdAt").limit(6);
        user.lastSeen = new Date();
        await user.save();
        return { posts, events };
    }
    ;
};
exports.FeedService = FeedService;
exports.FeedService = FeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.Models.Post)),
    __param(1, (0, mongoose_1.InjectModel)(models_1.Models.Group)),
    __param(2, (0, mongoose_1.InjectModel)(models_1.Models.Event)),
    __param(3, (0, mongoose_1.InjectModel)(models_1.Models.Service)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], FeedService);
;
//# sourceMappingURL=feed.service.js.map