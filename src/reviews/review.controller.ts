import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create.review.dto";
import { QueryReviewDto } from "./dto/query.review.dto";
import { UpdateReviewDto } from "./dto/update.review.dto";
import { Protected } from "src/guards/protect.user";
import { UserDoc } from "src/schema.factory/user.schema";
import { AuthUser } from "src/decorator/current.user";
import { ParseMongoId } from "src/pipes/validate.mogoid";
import { mongodbId } from "src/group/group.service";



@Controller("review")
export class ReviewController {
    constructor(private reviewService:ReviewService ){};
    @Post()
    @UseGuards(Protected)
    createReview(
        @Body() body:CreateReviewDto,
        @AuthUser() user:UserDoc
    ){
        return this.reviewService.createReview(body,user);
    };
    @Patch(":reviewId")
    @UseGuards(Protected)
    updateReview(
        @Body() body:UpdateReviewDto,
        @Param("reviewId",ParseMongoId) reviewId:mongodbId,
        @AuthUser() user:UserDoc
    ){
        return this.reviewService.updateReview(body,reviewId,user);
    };
    @Delete(":reviewId")
    @UseGuards(Protected)
    deleteReview(
        @Param("reviewId",ParseMongoId) reviewId:mongodbId,
        @AuthUser() user:UserDoc
    ){
        return this.reviewService.deleteReview(reviewId,user);
    };
    @Get()
    @UseGuards(Protected)
    getReviews(
        @Query() query:QueryReviewDto
    ){
        return this.reviewService.getAllReviews(query);
    };
    @Get(":reviewId")
    @UseGuards(Protected)
    getReview(
        @Param("reviewId",ParseMongoId) reviewId:mongodbId
    ){
        return this.reviewService.getReview(reviewId);
    };
};