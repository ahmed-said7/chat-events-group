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
import mongoose, { Document, Types } from "mongoose";
import { mongodbId } from "src/group/group.service";
export declare class UserSchema {
    schema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
        timestamps: true;
    }, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        email: string;
        password: string;
        role: "user" | "admin";
        emailVertified: boolean;
        followers: {
            prototype?: Types.ObjectId;
            cacheHexString?: unknown;
            generate?: {};
            createFromTime?: {};
            createFromHexString?: {};
            createFromBase64?: {};
            isValid?: {};
        }[];
        savedEvents: {
            prototype?: Types.ObjectId;
            cacheHexString?: unknown;
            generate?: {};
            createFromTime?: {};
            createFromHexString?: {};
            createFromBase64?: {};
            isValid?: {};
        }[];
        averageRating: number;
        ratingQuantity: number;
        addresses: Types.DocumentArray<{
            code?: number;
            country?: string;
            city?: string;
            quarter?: string;
        }>;
        active: boolean;
        image?: string;
        lastSeen?: Date;
        emailVerifiedExpired?: Date;
        emailVerifiedCode?: string;
        passwordChangedAt?: Date;
        passwordResetCode?: string;
        passwordResetCodeExpires?: Date;
        passwordResetCodeVertified?: boolean;
    }, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        email: string;
        password: string;
        role: "user" | "admin";
        emailVertified: boolean;
        followers: {
            prototype?: Types.ObjectId;
            cacheHexString?: unknown;
            generate?: {};
            createFromTime?: {};
            createFromHexString?: {};
            createFromBase64?: {};
            isValid?: {};
        }[];
        savedEvents: {
            prototype?: Types.ObjectId;
            cacheHexString?: unknown;
            generate?: {};
            createFromTime?: {};
            createFromHexString?: {};
            createFromBase64?: {};
            isValid?: {};
        }[];
        averageRating: number;
        ratingQuantity: number;
        addresses: Types.DocumentArray<{
            code?: number;
            country?: string;
            city?: string;
            quarter?: string;
        }>;
        active: boolean;
        image?: string;
        lastSeen?: Date;
        emailVerifiedExpired?: Date;
        emailVerifiedCode?: string;
        passwordChangedAt?: Date;
        passwordResetCode?: string;
        passwordResetCodeExpires?: Date;
        passwordResetCodeVertified?: boolean;
    }>> & mongoose.FlatRecord<{
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        name: string;
        email: string;
        password: string;
        role: "user" | "admin";
        emailVertified: boolean;
        followers: {
            prototype?: Types.ObjectId;
            cacheHexString?: unknown;
            generate?: {};
            createFromTime?: {};
            createFromHexString?: {};
            createFromBase64?: {};
            isValid?: {};
        }[];
        savedEvents: {
            prototype?: Types.ObjectId;
            cacheHexString?: unknown;
            generate?: {};
            createFromTime?: {};
            createFromHexString?: {};
            createFromBase64?: {};
            isValid?: {};
        }[];
        averageRating: number;
        ratingQuantity: number;
        addresses: Types.DocumentArray<{
            code?: number;
            country?: string;
            city?: string;
            quarter?: string;
        }>;
        active: boolean;
        image?: string;
        lastSeen?: Date;
        emailVerifiedExpired?: Date;
        emailVerifiedCode?: string;
        passwordChangedAt?: Date;
        passwordResetCode?: string;
        passwordResetCodeExpires?: Date;
        passwordResetCodeVertified?: boolean;
    }> & {
        _id: Types.ObjectId;
    }>;
    constructor();
}
export interface UserDoc extends Document {
    name: string;
    email: string;
    image: string;
    password: string;
    role: string;
    lastSeen: Date;
    emailVertified?: boolean;
    emailVerifiedExpired?: Date;
    emailVerifiedCode?: string;
    passwordChangedAt?: Date;
    passwordResetCode?: string;
    passwordResetCodeExpires?: Date;
    passwordResetCodeVertified?: boolean;
    followers: mongodbId[];
    savedEvents: mongodbId[];
    averageRating: number;
    ratingQuantity: number;
    addresses: {
        _id: mongodbId;
        postalCode: number;
        details: string;
        city: string;
        street: string;
        mobile: string;
    }[];
}
