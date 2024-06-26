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
import { Model, Schema } from "mongoose";
import { GroupDoc } from "src/schema.factory/group.schema";
import { UserDoc } from "src/schema.factory/user.schema";
interface CreateGroup {
    name: string;
    image?: string;
    users: mongodbId[];
}
interface UpdateGroup {
    name?: string;
    image?: string;
}
export type mongodbId = Schema.Types.ObjectId;
export declare class GroupServices {
    private groupModel;
    private userModel;
    constructor(groupModel: Model<GroupDoc>, userModel: Model<UserDoc>);
    createGroup(body: CreateGroup, user: UserDoc): Promise<{
        group: import("mongoose").Document<unknown, {}, GroupDoc> & GroupDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    leaveGroup(groupId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    addUserToGroup(groupId: mongodbId, userId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    requestToJoinGroup(groupId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    acceptRequestToJoinGroup(groupId: mongodbId, userId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    rejectRequestToJoinGroup(groupId: mongodbId, userId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    changeGroupAdmin(groupId: mongodbId, userId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    removeMemberFromGroup(groupId: mongodbId, userId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    getUserGroups(user: UserDoc): Promise<{
        groups: (import("mongoose").Document<unknown, {}, GroupDoc> & GroupDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    searchGroups(keyword: string): Promise<{
        groups: (import("mongoose").Document<unknown, {}, GroupDoc> & GroupDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    updateGroup(body: UpdateGroup, groupId: mongodbId, user: UserDoc): Promise<{
        group: import("mongoose").Document<unknown, {}, GroupDoc> & GroupDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deleteGroup(groupId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    getGroupRequests(groupId: mongodbId, user: UserDoc): Promise<{
        requests: Schema.Types.ObjectId[];
    }>;
    getGroupMembers(groupId: mongodbId, user: UserDoc): Promise<{
        users: Schema.Types.ObjectId[];
        admin: Schema.Types.ObjectId;
    }>;
}
export {};
