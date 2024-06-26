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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const review_service_1 = require("./review.service");
const create_review_dto_1 = require("./dto/create.review.dto");
const query_review_dto_1 = require("./dto/query.review.dto");
const update_review_dto_1 = require("./dto/update.review.dto");
const protect_user_1 = require("../guards/protect.user");
const current_user_1 = require("../decorator/current.user");
const validate_mogoid_1 = require("../pipes/validate.mogoid");
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    ;
    createReview(body, user) {
        return this.reviewService.createReview(body, user);
    }
    ;
    updateReview(body, reviewId, user) {
        return this.reviewService.updateReview(body, reviewId, user);
    }
    ;
    deleteReview(reviewId, user) {
        return this.reviewService.deleteReview(reviewId, user);
    }
    ;
    getReviews(query) {
        return this.reviewService.getAllReviews(query);
    }
    ;
    getReview(reviewId) {
        return this.reviewService.getReview(reviewId);
    }
    ;
};
exports.ReviewController = ReviewController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_dto_1.CreateReviewDto, Object]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "createReview", null);
__decorate([
    (0, common_1.Patch)(":reviewId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)("reviewId", validate_mogoid_1.ParseMongoId)),
    __param(2, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_review_dto_1.UpdateReviewDto, Object, Object]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "updateReview", null);
__decorate([
    (0, common_1.Delete)(":reviewId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("reviewId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "deleteReview", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_review_dto_1.QueryReviewDto]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "getReviews", null);
__decorate([
    (0, common_1.Get)(":reviewId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("reviewId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReviewController.prototype, "getReview", null);
exports.ReviewController = ReviewController = __decorate([
    (0, common_1.Controller)("review"),
    __metadata("design:paramtypes", [review_service_1.ReviewService])
], ReviewController);
;
//# sourceMappingURL=review.controller.js.map