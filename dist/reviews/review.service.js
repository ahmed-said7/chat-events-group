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
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../enums/models");
const api_service_1 = require("../filter/api.service");
let ReviewService = class ReviewService {
    constructor(reviewModel, userModel, api) {
        this.reviewModel = reviewModel;
        this.userModel = userModel;
        this.api = api;
    }
    ;
    async createReview(body, user) {
        const userExisting = await this.userModel.findById(body.review);
        if (!userExisting) {
            throw new common_1.HttpException("user not found", 400);
        }
        ;
        const reviewExisting = await this.reviewModel.findOne({
            review: body.review,
            user: user._id
        });
        if (reviewExisting) {
            throw new common_1.HttpException("you have already reviewed", 400);
        }
        ;
        body.user = user._id;
        const review = await this.reviewModel.create(body);
        return { review };
    }
    ;
    async updateReview(body, reviewId, user) {
        let review = await this.accessReview(reviewId, user);
        if (body.rating) {
            review.rating = body.rating;
        }
        ;
        await review.save();
        review = await review.populate(this.populationOpts());
        return { review };
    }
    ;
    async deleteReview(reviewId, user) {
        let review = await this.accessReview(reviewId, user);
        await review.deleteOne();
        return { review };
    }
    ;
    async accessReview(reviewId, user) {
        const review = await this.reviewModel.findOne({
            _id: reviewId
        });
        if (!review) {
            throw new common_1.HttpException("No review found", 400);
        }
        if (review.user.toString() != user._id.toString()) {
            throw new common_1.HttpException("you are not allowed to edit this review", 400);
        }
        ;
        return review;
    }
    ;
    async getReview(reviewId) {
        let review = await this.reviewModel
            .findOne({ _id: reviewId })
            .populate(this.populationOpts());
        if (!review) {
            throw new common_1.HttpException("Review not found", 400);
        }
        ;
        return { review };
    }
    ;
    async getAllReviews(query) {
        const { paginationObj, query: data } = await this.api
            .filter(this.reviewModel.find(), query)
            .select().sort().pagination();
        const reviews = await data.populate(this.populationOpts());
        return { reviews, paginationObj };
    }
    ;
    populationOpts() {
        return [
            { path: "user", select: "name image" },
            { path: "review", select: "name image" }
        ];
    }
    ;
    async aggregation(userId) {
        const result = await this.reviewModel.aggregate([
            { $match: { review: userId } },
            { $group: {
                    _id: "$review",
                    average: { $avg: "$rating" },
                    quantity: { $sum: 1 }
                } }
        ]);
        if (result.length > 0) {
            await this.userModel.findByIdAndUpdate(userId, {
                averageRating: result[0].average,
                ratingQuantity: result[0].quantity
            });
        }
        ;
    }
    ;
    async handleDeleteOne(body) {
        await this.aggregation(body.review);
    }
    ;
    async handleSaved(body) {
        await this.aggregation(body.review);
    }
    ;
};
exports.ReviewService = ReviewService;
__decorate([
    (0, event_emitter_1.OnEvent)("review.deleteOne"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewService.prototype, "handleDeleteOne", null);
__decorate([
    (0, event_emitter_1.OnEvent)("review.save"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewService.prototype, "handleSaved", null);
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.Models.Review)),
    __param(1, (0, mongoose_1.InjectModel)(models_1.Models.User)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        api_service_1.apiFeatures])
], ReviewService);
;
//# sourceMappingURL=review.service.js.map