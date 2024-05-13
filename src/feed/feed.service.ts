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
    async getFeed( user : UserDoc , page:string ){
        const groupIds=(await  this.groupModel.find({ "users" : user._id }).select("_id"))
            .map( ( { _id } ) => _id );
        let limit=5;
        const skip=( ( parseInt(page) || 1 ) - 1 ) * limit;
        const posts=await this.postModel.find({ group : { $in : groupIds } })
            .populate(["user","group"]).sort("-createdAt").skip(skip).limit(limit);
        const events=await this.eventModel.find()
            .populate("admin").sort("-createdAt").skip(skip).limit(limit);
        const services=await this.providerModel.find()
            .populate("admin").sort("-createdAt").skip(skip).limit(limit);
        return { posts , events , services };
    };
};