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
        const groupIds=(await  this.groupModel.find({ "users" : user._id })).map( ( { _id } ) => _id );
        let limit=5;
        let skipRate= parseInt(page) - 1 || 0;
        const postsCount=await this.postModel.find( { group : { $in : groupIds } } ) . countDocuments();
        // const serviceCount=await this.providerModel.countDocuments();
        const eventCount=await this.eventModel.countDocuments();
        const sum=postsCount+eventCount // +serviceCount
        const postLimit= Math.floor( ( ( postsCount / sum ) * 100 ) / limit );
        // const serviceLimit= Math.floor( ( ( serviceCount / sum ) * 100 ) / limit );
        const eventLimit= Math.floor( ( ( eventCount / sum ) * 100 ) / limit );
        const posts=await this.postModel
            .find( { group : { $in : groupIds } } ) 
            .populate(
                [
                    {path:"user",select:"name image"}
                    ,{path:"user",select:"name image"}
                ])
            .sort("-createdAt")
            .skip( skipRate*postLimit ).limit(postLimit);
        const events=await this.eventModel.find()
            .populate({path:"admin",select:"name image"})
            .sort("-createdAt").skip( skipRate*eventLimit ).limit(eventLimit);

        // const services=await this.providerModel.find()
        //     .populate({path:"admin",select:"name image"})
        //     .sort("-createdAt").skip( skipRate*serviceLimit ).limit(serviceLimit);

        user.lastSeen=new Date();
        await user.save();
        return { posts , events  };
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

        // const services=await this.providerModel
        //     .find({$or : [ { createdAt : { $gt : user.lastSeen } } , { updatedAt: {$gt : user.lastSeen } }]})
        //     .populate({path:"admin",select:"name image"}).sort("-createdAt").limit(6);
        
        user.lastSeen=new Date();
        await user.save();
        return { posts , events };
    };
};