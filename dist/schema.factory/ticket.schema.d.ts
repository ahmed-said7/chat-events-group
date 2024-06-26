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
import { Schema, Document, Model } from "mongoose";
import { mongodbId } from "src/group/group.service";
export declare class TicketSchema {
    schema: Schema<any, Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
        timestamps: true;
    }, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        price: number;
        isPaid: boolean;
        user?: import("mongoose").Types.ObjectId;
        paidAt?: Date;
        event?: import("mongoose").Types.ObjectId;
        owner?: import("mongoose").Types.ObjectId;
    }, Document<unknown, {}, import("mongoose").FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        price: number;
        isPaid: boolean;
        user?: import("mongoose").Types.ObjectId;
        paidAt?: Date;
        event?: import("mongoose").Types.ObjectId;
        owner?: import("mongoose").Types.ObjectId;
    }>> & import("mongoose").FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        price: number;
        isPaid: boolean;
        user?: import("mongoose").Types.ObjectId;
        paidAt?: Date;
        event?: import("mongoose").Types.ObjectId;
        owner?: import("mongoose").Types.ObjectId;
    }> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
export interface TicketDoc extends Document {
    event: mongodbId;
    user: mongodbId;
    owner: mongodbId;
    price: number;
    paidAt: Date;
    isPaid: boolean;
}
