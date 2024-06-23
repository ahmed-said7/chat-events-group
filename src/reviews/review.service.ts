import { HttpException, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Models } from "src/enums/models";
import { ReviewDoc } from "src/schema.factory/review.schema";
import { UserDoc } from "src/schema.factory/user.schema";
import { CreateReviewDto } from "./dto/create.review.dto";
import { UpdateReviewDto } from "./dto/update.review.dto";
import { QueryReviewDto } from "./dto/query.review.dto";
import { apiFeatures } from "src/filter/api.service";
import { mongodbId } from "src/group/group.service";



@Injectable()
export class ReviewService {
    constructor( 
        @InjectModel(Models.Review) private reviewModel:Model<ReviewDoc>,
        @InjectModel(Models.User) private userModel:Model<UserDoc>,
        private api:apiFeatures<ReviewDoc,QueryReviewDto>
    ){};
    async createReview(body:CreateReviewDto,user:UserDoc){
        const userExisting=await this.userModel.findById(body.review);
        if(!userExisting){
            throw new HttpException("user not found",400);
        };
        const reviewExisting=await this.reviewModel.findOne({
            review: body.review,
            user: user._id
        });
        if(reviewExisting){
            throw new HttpException("you have already reviewed",400);
        };
        body.user=user._id;
        const review=await this.reviewModel.create(body);
        return { review };
    };
    async updateReview( body:UpdateReviewDto , reviewId:mongodbId , user:UserDoc ){
        let review = await this.accessReview(reviewId,user);
        if(body.rating){
            review.rating = body.rating;
        };
        await review.save();
        review=await review.populate( this.populationOpts() );
        return { review }
    };
    async deleteReview(  reviewId:mongodbId , user:UserDoc ){
        let review = await this.accessReview( reviewId ,user);
        await review.deleteOne();
        return { review }
    };
    private async accessReview(reviewId:mongodbId,user:UserDoc){
        const review =await this.reviewModel.findOne({
            _id:reviewId
        });
        if(!review){
            throw new HttpException("No review found",400);
        }
        if( review.user.toString() != user._id.toString()  ){
            throw new HttpException("you are not allowed to edit this review",400);
        };
        return review;
    };
    async getReview( reviewId:mongodbId ){
        let review = await this.reviewModel
            .findOne({ _id: reviewId })
            .populate( this.populationOpts() );
        if( !review ){
            throw new HttpException("Review not found",400);
        };
        return { review };
    };
    async getAllReviews( query:QueryReviewDto ){
        const { paginationObj , query:data } = await this.api
            .filter( this.reviewModel.find() , query )
            .select().sort().pagination();
        const reviews=await data.populate( this.populationOpts() );
        return { reviews , paginationObj };
    };
    private populationOpts(){
        return [
            { path:"user" , select:"name image" },
            { path:"review" , select:"name image" }
        ];
    };
    private async aggregation(userId:mongodbId){
        const result = await this.reviewModel.aggregate([
            { $match : { review:userId } },
            { $group : {
                _id : "$review",
                average: { $avg : "$rating" },
                quantity: { $sum : 1 }
            } }
        ]);
        if( result.length > 0 ){
            await this.userModel.findByIdAndUpdate(userId,{
                averageRating: result[0].average,
                ratingQuantity: result[0].quantity
            });
        };
    };
    @OnEvent("review.deleteOne")
    private async handleDeleteOne(body:ReviewDoc){
        await this.aggregation(body.review);
    };
    @OnEvent("review.save")
    private async handleSaved(body:ReviewDoc){
        await this.aggregation(body.review);
    };
};