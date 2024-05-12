import { HttpException, Type } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId, Schema, Types } from "mongoose";
import { Models } from "src/enums/models";
import { GroupDoc } from "src/schema.factory/group.schema";
import { UserDoc } from "src/schema.factory/user.schema";

interface CreateGroup {
    name: string;
    image?: string;
    users: mongodbId[];
};
interface UpdateGroup {
    name?: string;
    image?: string;
};
export type mongodbId=Schema.Types.ObjectId;

export class GroupServices {
    constructor
    (
        @InjectModel(Models.Group) private groupModel:Model<GroupDoc>,
        @InjectModel(Models.User) private userModel:Model<UserDoc>
    ){};
    async createGroup(body:CreateGroup,user:UserDoc){
        const users=await this.userModel.find({
            _id : { $in : body.users }
        });
        if( users.length !== body.users.length ){
            throw new HttpException("invalid user id",400);
        };
        if( !body.users.includes( user._id ) ){
            body.users.push( user._id );
        };
        const group=await this.groupModel.create({
            ... body,
            admin:user._id
        });
        return { group };
    };
    async leaveGroup(groupId:mongodbId,user:UserDoc){
        const group=await this.groupModel.findOne({ _id:groupId });
        if( ! group ){
            throw new HttpException("Group not found",400);
        };
        if( group.admin.toString() == user._id.toString() ){
            throw new HttpException("you are group owner",400);
        };
        if( !group.users.includes(user._id) ){
            throw new HttpException("you are not group member",400);
        };
        group.users=group.users.filter( ( id ) => id.toString() != user._id.toString() );
        await group.save();
        return { group };
    };
    async addUserToGroup(groupId:mongodbId,userId:mongodbId,user:UserDoc){
        const userExists=await this.userModel.findOne({ _id:userId });
        if( ! userExists ){
            throw new HttpException("user not found",400);
        };
        const group=await this.groupModel.findOne({ _id:groupId });
        if( ! group ){
            throw new HttpException("Group not found",400);
        };
        if( group.admin.toString() != user._id.toString() ){
            throw new HttpException("you are not group admin",400);
        };
        if( group.users.includes( userExists._id ) ){
            throw new HttpException("user already join group",400);
        };
        group.users.push(userExists._id);
        await group.save();
        return { group };
    };
    async requestToJoinGroup( groupId:mongodbId , user:UserDoc ){
        const group=await this.groupModel.findOne({ _id:groupId });
        if( ! group ){
            throw new HttpException("Group not found",400);
        };
        console.log(group);
        if( group.users.includes( user._id ) ){
            throw new HttpException("user already join group",400);
        };
        if( group.requests.includes( user._id ) ){
            throw new HttpException("user already sent request to join group",400);
        };
        group.requests.push( user._id );
        await group.save();
        return { group };
    };
    async acceptRequestToJoinGroup( groupId:mongodbId, userId:mongodbId , user:UserDoc ){
        const userExists=await this.userModel.findOne({ _id:userId });
        if( ! userExists ){
            throw new HttpException("user not found",400);
        };
        const group=await this.groupModel.findOne({ _id:groupId });
        if( ! group ){
            throw new HttpException("Group not found",400);
        };
        if( group.admin.toString() != user._id.toString() ){
            throw new HttpException("you are not group admin",400);
        };
        if( group.users.includes( userId ) ){
            throw new HttpException("user already join group",400);
        };
        if( !group.requests.includes( userExists._id ) ){
            throw new HttpException("user does not sent any request",400);
        };
        group.users.push(userExists._id);
        group.requests=group.requests.filter( (id) => id.toString() != userExists._id.toString() );
        await group.save();
        return { group };
    };
    async rejectRequestToJoinGroup( groupId:mongodbId,userId:mongodbId, user:UserDoc ){
        const group=await this.groupModel.findOne({ _id:groupId });
        if( ! group ){
            throw new HttpException("Group not found",400);
        };
        if( group.admin.toString() != user._id.toString() ){
            throw new HttpException("you are not group admin",400);
        };
        if( !group.requests.includes( userId ) ){
            throw new HttpException("user does not sent any request",400);
        };
        group.requests=group.requests.filter( (id) => id.toString() != userId.toString() );
        await group.save();
        return { group };
    };
    async changeGroupAdmin(groupId:mongodbId,userId:mongodbId,user:UserDoc){
        const userExists=await this.userModel.findOne({ _id:userId });
        if( ! userExists ){
            throw new HttpException("user not found",400);
        };
        const group=await this.groupModel.findOne({ _id:groupId });
        if( ! group ){
            throw new HttpException("Group not found",400);
        };
        if( group.admin.toString() != user._id.toString() ){
            throw new HttpException("you are not group admin",400);
        };
        if( userId.toString() == user._id.toString()  ){
            throw new HttpException("you are already group owner",400);
        };
        if( !group.users.includes( userExists._id ) ){
            throw new HttpException("user is not group memeber",400);
        };
        group.admin=userExists._id;
        await group.save();
        return { group };
    };
    async removeMemberFromGroup(groupId:mongodbId,userId:mongodbId,user:UserDoc){
        const userExists=await this.userModel.findOne({ _id:userId });
        if( ! userExists ){
            throw new HttpException("user not found",400);
        };
        const group=await this.groupModel.findOne({ _id:groupId });
        if( ! group ){
            throw new HttpException("Group not found",400);
        };
        if( group.admin.toString() != user._id.toString() ){
            throw new HttpException("you are not group admin",400);
        };
        if( userId.toString() == user._id.toString()  ){
            throw new HttpException("can not remove group owner",400);
        };
        if( !group.users.includes( userExists._id ) ){
            throw new HttpException("user is not group member",400);
        };
        group.users=group.users.filter( ( id ) => id.toString() != userId.toString() );
        await group.save();
        return { group };
    };
    async getUserGroups(user:UserDoc){
        const groups=await this.groupModel.find({
            "users":user._id
        });
        return { groups };
    };
    async searchGroups(keyword:string){
        const groups=await this.groupModel.find({
            $text : {
                $search : keyword
            }
        });
        return { groups };
    };
    async updateGroup(body:UpdateGroup,groupId:mongodbId,user:UserDoc){
        const group=await this.groupModel.findOne({ _id:groupId });
        if( ! group ){
            throw new HttpException("Group not found",400);
        };
        if( group.admin.toString() != user._id.toString() ){
            throw new HttpException("you are not group admin",400);
        };
        await group.updateOne({ $set : body },{new:true});
        await group.save();
        return { group };
    };
    async deleteGroup(groupId:mongodbId,user:UserDoc){
        const group=await this.groupModel.findOne({ _id:groupId });
        if( ! group ){
            throw new HttpException("Group not found",400);
        };
        if( group.admin.toString() != user._id.toString() ){
            throw new HttpException("you are not group admin",400);
        };
        await group.deleteOne();
        return { status : "deleted" };
    };
    async getGroupRequests(groupId:mongodbId,user:UserDoc){
        const group=await this.groupModel.findOne({ _id:groupId })
            .populate({path:"requests",select:"name image"});
        if( ! group ){
            throw new HttpException("Group not found",400);
        };
        if( group.admin.toString() != user._id.toString() ){
            throw new HttpException("you are not group admin",400);
        };
        return { requests:group.requests };
    };
    async getGroupMembers(groupId:mongodbId,user:UserDoc){
        const group=await this.groupModel.findOne({ _id:groupId })
            .populate({path:"users",select:"name image"})
            .populate({path:"admin",select:"name image"});
        if( ! group ){
            throw new HttpException("Group not found",400);
        };
        if( !group.users.includes( user._id ) ){
            throw new HttpException("user is not group member",400);
        };
        return { users:group.users,admin:group.admin };
    };
};