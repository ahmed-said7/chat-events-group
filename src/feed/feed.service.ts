import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Models } from "src/enums/models";
import { EventDoc } from "src/schema.factory/events.schema";
import { GroupDoc } from "src/schema.factory/group.schema";
import { PostDoc } from "src/schema.factory/post.schema";
import { UserDoc } from "src/schema.factory/user.schema";
import { ServiceProviderDoc } from "src/schema.factory/user.service.schema";



@Injectable()
export class FeedService {
    constructor(
        @InjectModel(Models.Post) private postModel: Model<PostDoc>,
        @InjectModel(Models.Group) private groupModel: Model<GroupDoc>,
        @InjectModel(Models.Event) private eventModel: Model<EventDoc>,
        @InjectModel(Models.Service) private providerModel: Model<ServiceProviderDoc>
    ){};
    async getFeed( user : UserDoc , page?:string  ){
        const groupIds=(await  this.groupModel.find({ "users" : user._id }).select("_id"))
            .map( ( { _id } ) => _id );
        let limit=5;
        const skip=( ( parseInt(page) || 1 ) - 1 ) * limit;
        const posts=await this.postModel.find({ group : { $in : groupIds } })
            .populate(
                [
                    {path:"user",select:"name image"}
                    ,{path:"user",select:"name image"}
                ])
            .sort("-createdAt")
            .skip(skip).limit(limit);

        const events=await this.eventModel.find()
            .populate({path:"admin",select:"name image"}).sort("-createdAt").skip(skip).limit(limit);

            const services=await this.providerModel.find()
            .populate({path:"admin",select:"name image"}).sort("-createdAt").skip(skip).limit(limit);
        user.lastSeen=new Date();
        await user.save();
        return { posts , events , services };
    };
    async getNewFeed( user : UserDoc  ){
        if(!user.lastSeen){
            return this.getFeed( user );
        };
        const groupIds=(await  this.groupModel.find({ "users" : user._id }).select("_id"))
            .map( ( { _id } ) => _id );
            const posts=await this.postModel.find({ 
                group : { $in : groupIds } , 
                $or : [ { createdAt : { $gt : user.lastSeen } } , { updatedAt: {$gt : user.lastSeen } }]
            })
            .populate(
                [
                    {path:"user",select:"name image"}
                    ,{path:"user",select:"name image"}
                ])
            .sort("-createdAt").limit(6);

        const events=await this.eventModel
        .find({$or : [ { createdAt : { $gt : user.lastSeen } } , { updatedAt: {$gt : user.lastSeen } }]})
            .populate({path:"admin",select:"name image"}).sort("-createdAt").limit(6);

        const services=await this.providerModel
            .find({$or : [ { createdAt : { $gt : user.lastSeen } } , { updatedAt: {$gt : user.lastSeen } }]})
            .populate({path:"admin",select:"name image"}).sort("-createdAt").limit(6);
        
        user.lastSeen=new Date();
        await user.save();
        return { posts , events , services };
    };
};