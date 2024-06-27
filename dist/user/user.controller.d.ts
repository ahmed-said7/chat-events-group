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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UserService } from "./user.service";
import { LoginUserDto } from "./dto/login.dto";
import { SignupUserDto } from "./dto/signup.dto";
import { UpdatePasswordDto, changePasswordDto } from "./dto/update.password.dto";
import { UserDoc } from "src/schema.factory/user.schema";
import { UpdateUserDto, forgetPassowrdBody } from "./dto/update.user.dto";
import { mongodbId } from "src/group/group.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    login(body: LoginUserDto): Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, UserDoc> & UserDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    signup(body: SignupUserDto): Promise<{
        token: string;
        user: import("mongoose").Document<unknown, {}, UserDoc> & UserDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updatePassword(body: UpdatePasswordDto, user: UserDoc): Promise<{
        user: UserDoc;
        status: string;
    }>;
    forgetPassowrd(body: forgetPassowrdBody): Promise<{
        resetCode: string;
    }>;
    changePassword(body: changePasswordDto): Promise<{
        user: import("mongoose").Document<unknown, {}, UserDoc> & UserDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    verifyResetCode(code: string): Promise<{
        status: string;
    }>;
    deleteUser(user: UserDoc): Promise<{
        status: string;
    }>;
    getUser(user: UserDoc): Promise<{
        user: UserDoc;
    }>;
    updateUser(user: UserDoc, body: UpdateUserDto): Promise<{
        status: string;
        user: import("mongoose").Document<unknown, {}, UserDoc> & UserDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getUsers(keyword: string): Promise<{
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
    getUserFollowings(userId: mongodbId): Promise<{
        followers: import("mongoose").Schema.Types.ObjectId[];
    }>;
    getOneUser(userId: mongodbId): Promise<{
        user: import("mongoose").Document<unknown, {}, UserDoc> & UserDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
}
