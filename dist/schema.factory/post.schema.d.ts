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
import { Schema, Document } from "mongoose";
import { mongodbId } from "src/group/group.service";
export declare class PostSchema {
    schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
        timestamps: true;
    }, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        content: string;
        likes: import("mongoose").Types.ObjectId[];
        comments: import("mongoose").Types.DocumentArray<{
            content: string;
            user?: import("mongoose").Types.ObjectId;
        }>;
        user?: import("mongoose").Types.ObjectId;
        group?: import("mongoose").Types.ObjectId;
        image?: string;
    }, Document<unknown, {}, import("mongoose").FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        content: string;
        likes: import("mongoose").Types.ObjectId[];
        comments: import("mongoose").Types.DocumentArray<{
            content: string;
            user?: import("mongoose").Types.ObjectId;
        }>;
        user?: import("mongoose").Types.ObjectId;
        group?: import("mongoose").Types.ObjectId;
        image?: string;
    }>> & import("mongoose").FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        content: string;
        likes: import("mongoose").Types.ObjectId[];
        comments: import("mongoose").Types.DocumentArray<{
            content: string;
            user?: import("mongoose").Types.ObjectId;
        }>;
        user?: import("mongoose").Types.ObjectId;
        group?: import("mongoose").Types.ObjectId;
        image?: string;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    constructor();
}
export interface PostDoc extends Document {
    content: string;
    image: string;
    user: mongodbId;
    group: mongodbId;
    likes: mongodbId[];
    comments: {
        user: mongodbId;
        content: string;
        _id?: mongodbId;
    }[];
}
