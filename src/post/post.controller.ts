import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { PostService } from "./post.service";
import { Protected } from "src/guards/protect.user";
import { AuthUser } from "src/decorator/current.user";
import { UserDoc } from "src/schema.factory/user.schema";
import { CreatePostDto } from "./dto/post.create.dto";
import { mongodbId } from "src/group/group.service";
import { ParseMongoId } from "src/pipes/validate.mogoid";
import { IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { UpdatePostDto } from "./dto/post.update.dto";
import { CreateCommentDto } from "./dto/comment.create.dto";
import { FileInterceptorImage } from "src/interceptor/file.interceptor";
import { FileInterceptor } from "@nestjs/platform-express";

class QueryDto {
    @IsOptional()
    @Transform(({ value }) => {return parseInt(value)} )
    page: number;
    @IsOptional()
    @Transform(({ value }) => {return parseInt(value)} )
    limit: number;
};

@Controller("post")
@UseGuards(Protected)
export class PostController {
    constructor( private postService:PostService ){};
    @Get("comments/:id")
    getPostComments(
        @AuthUser() user:UserDoc,
        @Param("id",ParseMongoId) postId:mongodbId
    ){
        return this.postService.getComments(postId,user);
    };
    @Post("comments/:id")
    addPostComment(
        @Body( ) body:CreateCommentDto,
        @AuthUser() user:UserDoc,
        @Param("id",ParseMongoId) postId:mongodbId
    ){
        return this.postService.addComment(body,postId,user);
    };
    @Patch("comments/post/:postId/comment/:commentId")
    updatePostComment(
        @Body( ) body:CreateCommentDto,
        @AuthUser() user:UserDoc,
        @Param("postId",ParseMongoId) postId:mongodbId,
        @Param("commentId",ParseMongoId) commentId:mongodbId
    ){
        return this.postService.updateComment(body,postId,commentId,user);
    };
    @Delete("comments/post/:postId/comment/:commentId")
    deletePostComment(
        @AuthUser() user:UserDoc,
        @Param("postId",ParseMongoId) postId:mongodbId,
        @Param("commentId",ParseMongoId) commentId:mongodbId
    ){
        return this.postService.removeComment(postId,commentId,user);
    };
    @Post("likes/:postId")
    addLike(
        @AuthUser() user:UserDoc,
        @Param("postId",ParseMongoId) postId:mongodbId
    ){
        return this.postService.addLike(postId,user);
    };
    @Delete("likes/:postId")
    removeLike(
        @AuthUser() user:UserDoc,
        @Param("postId",ParseMongoId) postId:mongodbId
    ){
        return this.postService.removeLike(postId,user);
    };
    @Get("likes/:postId")
    getLike(
        @AuthUser() user:UserDoc,
        @Param("postId",ParseMongoId) postId:mongodbId
    ){
        return this.postService.getLikes(postId,user);
    };
    @Post()
    @UseInterceptors(FileInterceptor("image"),FileInterceptorImage)
    createPost(
        @AuthUser() user:UserDoc,
        @Body() body:CreatePostDto
    ){
        return this.postService.createPost(body,user)
    };
    @Get(":id")
    getGroupPosts(
        @AuthUser() user:UserDoc,
        @Param("id",ParseMongoId) groupId:mongodbId,
        @Query() query:QueryDto
    ){
        return this.postService
        .getGroupPosts(groupId,user ,query.page , query.limit );
    };
    @Delete(":id")
    deletePost(
        @AuthUser() user:UserDoc,
        @Param("id",ParseMongoId) postId:mongodbId
    ){
        return this.postService.deletePost(postId,user)
    };
    @Patch(":id")
    @UseInterceptors(FileInterceptor("image"),FileInterceptorImage)
    updatePost(
        @AuthUser() user:UserDoc,
        @Param("id",ParseMongoId) postId:mongodbId,
        @Body() body:UpdatePostDto
    ){
        return this.postService.updatePost(body,postId,user);
    };
};