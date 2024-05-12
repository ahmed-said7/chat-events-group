import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Models } from "src/enums/models";
import { mongodbId } from "src/group/group.service";
import { GroupDoc } from "src/schema.factory/group.schema";
import { PostDoc } from "src/schema.factory/post.schema";
import { UserDoc } from "src/schema.factory/user.schema";

interface CreatePost {
    content:string;
    image:string;
    user?:mongodbId;
    group:mongodbId;
};
interface Pagination {
    previousPage?:number;
    currentPage?:number;
    nextPage?:number;
    limit?:number;
    count?:number;
};

interface UpdatePost {
    content?:string;
    image?:string;
};

interface CreateComment {
    content:string;
    user?:mongodbId;
};

interface UpdateComment {
    content?:string;
};

@Injectable()
export class PostService {
    constructor(
        @InjectModel(Models.Post) private postModel: Model<PostDoc>,
        @InjectModel(Models.Group) private groupModel: Model<GroupDoc>
    ){};
    async createPost(body:CreatePost,user:UserDoc){
        body.user=user._id;
        await this.validateGroup(body.group,user);
        const post=await this.postModel.create(body);
        return { post };
    };
    async deletePost(postId:mongodbId,user:UserDoc){
        const post=await this.postModel.findOne({ 
            _id : postId
        });
        if( !post ){
            throw new HttpException("post not found" , 400 );
        };
        const groupExist=await this.groupModel.findOne({ 
            _id:post.group
        });
        if( groupExist.admin.toString() == user._id.toString() ){
            await post.deleteOne();
            return { status : "deleted" };
        };
        if( user._id.toString() != post.user.toString() ){
            throw new HttpException("you are not post owner",400);
        };
        await post.deleteOne();
        return { status : "deleted" };
    };
    async updatePost(body:UpdatePost,postId:mongodbId,user:UserDoc){
        const post=await this.postModel.findOne({ 
            _id : postId
        });
        if( !post ){
            throw new HttpException("post not found" , 400 );
        };
        if( user._id.toString() != post.user.toString() ){
            throw new HttpException("you are not post owner",400);
        };
        await post.updateOne({ $set : body });
        await post.save();
        return { status:"updated" , post };
    };
    async getGroupPosts( groupId:mongodbId,user:UserDoc,page?:number,limit?:number ){
        const pagination:Pagination={};
        pagination.count=await this.postModel.countDocuments();
        pagination.currentPage=page || 1;
        pagination.limit=limit || 10;
        const skip = ( pagination.currentPage -1 )* pagination.limit;
        if(page>1){
            pagination.previousPage=page-1;
        };
        if( pagination.currentPage*pagination.limit < pagination.count ){
            pagination.nextPage=page+1;
        };
        await this.validateGroup(groupId,user);
        const posts=await this.postModel.find({
            group:groupId
        })
            .populate("user")
            .sort("-createdAt")
            .skip(skip)
            .limit(pagination.limit);
        return { posts };
    };
    async addLike( postId:mongodbId , user:UserDoc ){
        const post=await this.postModel.findOne({ 
            _id : postId
        });
        if( !post ){
            throw new HttpException("post not found" , 400 );
        };
        await this.validateGroup(post.group,user);
        if( post.likes.includes(user._id) ){
            throw new HttpException("you have added like before",400)
        };
        post.likes.push(user._id);
        await post.save();
        return { status : "like added" , post };
    };
    private  async validateGroup( groupId:mongodbId , user:UserDoc ){
        const groupExist=await this.groupModel.findOne({ 
            _id:groupId
        });
        if( !groupExist ){
            throw new HttpException("group not found",400);
        };
        if( !groupExist.users.includes(user._id) ){
            throw new HttpException("you are not group member",400);
        };
        return groupExist;
    };
    async removeLike( postId:mongodbId , user:UserDoc ){
        const post=await this.postModel.findOne({ 
            _id : postId
        });
        if( !post ){
            throw new HttpException("post not found" , 400 );
        };
        await this.validateGroup(post.group,user);
        if( !post.likes.includes(user._id) ){
            throw new HttpException("you have not added like before",400)
        };
        post.likes=
            post.likes.filter( ( id ) => id.toString() != user._id.toString() );  
        await post.save();
        return { status : "like added" , post };
    };
    async getLikes( postId:mongodbId , user:UserDoc ){
        const post=await this.postModel.findOne({ 
            _id : postId
        }).populate("likes");
        if( !post ){
            throw new HttpException("post not found" , 400 );
        };
        await this.validateGroup(post.group,user);
        return { likes : post.likes };
    };
    async addComment(body:CreateComment,postId:mongodbId,user:UserDoc){
        const post=await this.postModel.findOne({ 
            _id : postId
        });
        if( !post ){
            throw new HttpException("post not found" , 400 );
        };
        await this.validateGroup(post.group,user);
        post.comments.push({ content : body.content , user:user._id  });
        await post.save();
        return { content : body.content , user  }
    };
    async removeComment(postId:mongodbId,commentId:mongodbId,user:UserDoc){
        const post=await this.postModel.findOne({ 
            _id : postId
        });
        if( !post ){
            throw new HttpException("post not found" , 400 );
        };
        const group= await this.validateGroup(post.group,user);
        const index=post.comments
            .findIndex( ( { _id } ) => _id.toString() == commentId.toString()  );
        if( index == -1 ){
            throw new HttpException("No comment found",400);
        };
        if( 
            group.admin.toString() == user._id.toString() || 
            post.comments[index].user.toString() == user._id.toString()
        ){
            post.comments.splice(index,1);
            await post.save();
            return { status:"deleted" , post }
        }else {
            throw new HttpException("you are not allowed to delete a comment",400);
        };
    };
    async updateComment(body:UpdateComment,postId:mongodbId,commentId:mongodbId,user:UserDoc){
        const post=await this.postModel.findOne({ 
            _id : postId
        });
        if( !post ){
            throw new HttpException("post not found" , 400 );
        };
        await this.validateGroup(post.group,user);
        const index=post.comments
            .findIndex( ( { _id } ) => _id.toString() == commentId.toString()  );
        if( index == -1 ){
            throw new HttpException("No comment found",400);
        };
        if( 
            post.comments[index].user.toString() == user._id.toString()
        ){
            post.comments[index].content=body.content;
            await post.save();
            return { status:"updated" , post }
        }else {
            throw new HttpException("you are not allowed to update a comment",400);
        };
    };
    async getComments(postId:mongodbId , user:UserDoc){
        const post=await this.postModel.findOne({
            _id : postId
        }).populate("comments.user");
        if( !post ){
            throw new HttpException("post not found" , 400 );
        };
        await this.validateGroup(post.group,user);
        return { comments : post.comments };
    };
};