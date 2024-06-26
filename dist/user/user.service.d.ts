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
import { ConfigService } from "@nestjs/config";
import { UserDoc } from "src/schema.factory/user.schema";
import { mongodbId } from "src/group/group.service";
import { mailerService } from "src/nodemailer/nodemailer.service";
interface SignUp {
    name: string;
    password: string;
    email: string;
    role?: string;
}
interface UpdateUser {
    name?: string;
    email?: string;
    role?: string;
}
interface LogIn {
    email: string;
    password: string;
}
interface ChangePassword {
    password: string;
    currentPassword: string;
    passwordConfirm: string;
}
export declare class UserService {
    private config;
    private Usermodel;
    private mailerService;
    constructor(config: ConfigService, Usermodel: Model<UserDoc>, mailerService: mailerService);
    signup(body: SignUp): Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, UserDoc> & UserDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    private emailVerification;
    createEmailVerificationCode(user: UserDoc): Promise<{
        status: string;
    }>;
    private createHash;
    verifyEmail(code: string): Promise<{
        status: string;
    }>;
    login(body: LogIn): Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, UserDoc> & UserDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    private createtoken;
    updatepassword(body: ChangePassword, user: UserDoc): Promise<{
        user: UserDoc;
        status: string;
    }>;
    deleteUser(user: UserDoc): Promise<{
        status: string;
    }>;
    getUser(user: UserDoc): Promise<{
        user: UserDoc;
    }>;
    private validateEmail;
    updateUser(body: UpdateUser, user: UserDoc): Promise<{
        status: string;
        user: import("mongoose").Document<unknown, {}, UserDoc> & UserDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getOneUser(userId: mongodbId): Promise<{
        user: import("mongoose").Document<unknown, {}, UserDoc> & UserDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    forgetPassword(email: string): Promise<{
        resetCode: string;
    }>;
    vertfyResetCode(resetCode: string): Promise<{
        status: string;
    }>;
    changePassword(body: {
        email: string;
        password: string;
        passwordConfirm: string;
    }): Promise<{
        user: import("mongoose").Document<unknown, {}, UserDoc> & UserDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getUsersBySearchName(keyword?: string): Promise<{
        users: (import("mongoose").Document<unknown, {}, UserDoc> & UserDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    addFollow(userId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    removeFollow(userId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    getUserFollowers(userId: mongodbId): Promise<{
        followers: import("mongoose").Schema.Types.ObjectId[];
    }>;
}
export {};
