/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { ReviewDoc } from "src/schema.factory/review.schema";
import { UserDoc } from "src/schema.factory/user.schema";
import { CreateReviewDto } from "./dto/create.review.dto";
import { UpdateReviewDto } from "./dto/update.review.dto";
import { QueryReviewDto } from "./dto/query.review.dto";
import { apiFeatures } from "src/filter/api.service";
import { mongodbId } from "src/group/group.service";
export declare class ReviewService {
    private reviewModel;
    private userModel;
    private api;
    constructor(reviewModel: Model<ReviewDoc>, userModel: Model<UserDoc>, api: apiFeatures<ReviewDoc, QueryReviewDto>);
    createReview(body: CreateReviewDto, user: UserDoc): Promise<{
        review: import("mongoose").Document<unknown, {}, ReviewDoc> & ReviewDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateReview(body: UpdateReviewDto, reviewId: mongodbId, user: UserDoc): Promise<{
        review: import("mongoose").Document<unknown, {}, ReviewDoc> & ReviewDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deleteReview(reviewId: mongodbId, user: UserDoc): Promise<{
        review: import("mongoose").Document<unknown, {}, ReviewDoc> & ReviewDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    private accessReview;
    getReview(reviewId: mongodbId): Promise<{
        review: import("mongoose").Document<unknown, {}, ReviewDoc> & ReviewDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getAllReviews(query: QueryReviewDto): Promise<{
        reviews: ReviewDoc[];
        paginationObj: import("src/filter/api.service").Pagination;
    }>;
    private populationOpts;
    private aggregation;
    private handleDeleteOne;
    private handleSaved;
}
