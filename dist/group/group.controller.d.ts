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
import { GroupServices, mongodbId } from "./group.service";
import { CreateGroupDto } from "./dto/create.group.dto";
import { UserDoc } from "src/schema.factory/user.schema";
import { UpdateGroupDto } from "./dto/update.group.dto";
export declare class GroupController {
    private groupService;
    constructor(groupService: GroupServices);
    createGroup(body: CreateGroupDto, user: UserDoc): Promise<{
        group: import("mongoose").Document<unknown, {}, import("../schema.factory/group.schema").GroupDoc> & import("../schema.factory/group.schema").GroupDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    addUserToGroup(user: UserDoc, groupId: mongodbId, userId: mongodbId): Promise<{
        status: string;
    }>;
    leaveGroup(user: UserDoc, groupId: mongodbId): Promise<{
        status: string;
    }>;
    requestToJoinGroup(user: UserDoc, groupId: mongodbId): Promise<{
        status: string;
    }>;
    acceptRequestToJoinGroup(user: UserDoc, groupId: mongodbId, userId: mongodbId): Promise<{
        status: string;
    }>;
    rejectRequestToJoinGroup(user: UserDoc, groupId: mongodbId, userId: mongodbId): Promise<{
        status: string;
    }>;
    getGroupMembers(user: UserDoc, groupId: mongodbId): Promise<{
        users: import("mongoose").Schema.Types.ObjectId[];
        admin: import("mongoose").Schema.Types.ObjectId;
    }>;
    getGroupRequests(user: UserDoc, groupId: mongodbId): Promise<{
        requests: import("mongoose").Schema.Types.ObjectId[];
    }>;
    removeMemberFromGroup(user: UserDoc, groupId: mongodbId, userId: mongodbId): Promise<{
        status: string;
    }>;
    changeGroupAdmin(user: UserDoc, groupId: mongodbId, userId: mongodbId): Promise<{
        status: string;
    }>;
    getUserGroups(user: UserDoc): Promise<{
        groups: (import("mongoose").Document<unknown, {}, import("../schema.factory/group.schema").GroupDoc> & import("../schema.factory/group.schema").GroupDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getGroupsByKeywords(keyword: string): Promise<{
        groups: (import("mongoose").Document<unknown, {}, import("../schema.factory/group.schema").GroupDoc> & import("../schema.factory/group.schema").GroupDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    deleteGroup(user: UserDoc, groupId: mongodbId): Promise<{
        status: string;
    }>;
    updateGroup(user: UserDoc, body: UpdateGroupDto, groupId: mongodbId): Promise<{
        group: import("mongoose").Document<unknown, {}, import("../schema.factory/group.schema").GroupDoc> & import("../schema.factory/group.schema").GroupDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
}
