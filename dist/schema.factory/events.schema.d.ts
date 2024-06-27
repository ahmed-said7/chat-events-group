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
export declare class EventSchema {
    schema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
        timestamps: true;
    }, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        averageRating: number;
        ratingQuantity: number;
        likes: import("mongoose").Types.ObjectId[];
        comments: import("mongoose").Types.DocumentArray<{
            user?: import("mongoose").Types.ObjectId;
            content?: string;
        }>;
        location: number[];
        interested: import("mongoose").Types.ObjectId[];
        went: import("mongoose").Types.ObjectId[];
        price: number;
        image?: string;
        admin?: import("mongoose").Types.ObjectId;
        details?: string;
        address?: string;
        startedAt?: Date;
        endedAt?: Date;
    }, Document<unknown, {}, import("mongoose").FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        averageRating: number;
        ratingQuantity: number;
        likes: import("mongoose").Types.ObjectId[];
        comments: import("mongoose").Types.DocumentArray<{
            user?: import("mongoose").Types.ObjectId;
            content?: string;
        }>;
        location: number[];
        interested: import("mongoose").Types.ObjectId[];
        went: import("mongoose").Types.ObjectId[];
        price: number;
        image?: string;
        admin?: import("mongoose").Types.ObjectId;
        details?: string;
        address?: string;
        startedAt?: Date;
        endedAt?: Date;
    }>> & import("mongoose").FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        averageRating: number;
        ratingQuantity: number;
        likes: import("mongoose").Types.ObjectId[];
        comments: import("mongoose").Types.DocumentArray<{
            user?: import("mongoose").Types.ObjectId;
            content?: string;
        }>;
        location: number[];
        interested: import("mongoose").Types.ObjectId[];
        went: import("mongoose").Types.ObjectId[];
        price: number;
        image?: string;
        admin?: import("mongoose").Types.ObjectId;
        details?: string;
        address?: string;
        startedAt?: Date;
        endedAt?: Date;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    constructor();
}
export interface EventDoc extends Document {
    name: string;
    details: string;
    location: [number, number];
    startedAt: Date;
    endedAt: Date;
    interested: mongodbId[];
    went: mongodbId[];
    likes: mongodbId[];
    comments: {
        _id?: mongodbId;
        user: mongodbId;
        content: string;
    }[];
    image: string;
    address: string;
    admin: mongodbId;
    price: number;
}
