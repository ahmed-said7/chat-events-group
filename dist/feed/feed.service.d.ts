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
import { EventDoc } from "src/schema.factory/events.schema";
import { GroupDoc } from "src/schema.factory/group.schema";
import { PostDoc } from "src/schema.factory/post.schema";
import { UserDoc } from "src/schema.factory/user.schema";
import { ServiceProviderDoc } from "src/schema.factory/user.service.schema";
export declare class FeedService {
    private postModel;
    private groupModel;
    private eventModel;
    private providerModel;
    constructor(postModel: Model<PostDoc>, groupModel: Model<GroupDoc>, eventModel: Model<EventDoc>, providerModel: Model<ServiceProviderDoc>);
    getFeed(user: UserDoc, page?: string): Promise<{
        posts: (import("mongoose").Document<unknown, {}, PostDoc> & PostDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        events: (import("mongoose").Document<unknown, {}, EventDoc> & EventDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getNewFeed(user: UserDoc): Promise<{
        posts: (import("mongoose").Document<unknown, {}, PostDoc> & PostDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        events: (import("mongoose").Document<unknown, {}, EventDoc> & EventDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
}
