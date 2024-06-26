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
import { mongodbId } from "src/group/group.service";
import { ChatDoc } from "src/schema.factory/chat.schema";
import { UserDoc } from "src/schema.factory/user.schema";
interface CreateChat {
    name: string;
    image: string;
    user: mongodbId;
    admin: mongodbId;
}
interface UpdateChat {
    name?: string;
    image?: string;
}
export declare class ChatService {
    private chatModel;
    private userModel;
    constructor(chatModel: Model<ChatDoc>, userModel: Model<UserDoc>);
    createChat(body: CreateChat, user: UserDoc): Promise<{
        chat: import("mongoose").Document<unknown, {}, ChatDoc> & ChatDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateChat(chatId: mongodbId, body: UpdateChat, user: UserDoc): Promise<{
        chat: import("mongoose").Document<unknown, {}, ChatDoc> & ChatDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getChats(user: UserDoc): Promise<{
        chats: (import("mongoose").Document<unknown, {}, ChatDoc> & ChatDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    deleteChat(chatId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    getChatMemebers(chatId: mongodbId, user: UserDoc): Promise<{
        admin: import("mongoose").Schema.Types.ObjectId;
        user: import("mongoose").Schema.Types.ObjectId;
    }>;
}
export {};
