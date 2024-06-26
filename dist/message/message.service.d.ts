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
import { MessageDoc } from "src/schema.factory/message.schema";
import { UserDoc } from "src/schema.factory/user.schema";
interface CreateMsg {
    content?: string;
    image?: string;
    chat: mongodbId;
    user?: mongodbId;
}
interface UpdateMsg {
    content?: string;
    image?: string;
}
export declare class MessageService {
    private chatModel;
    private msgModel;
    constructor(chatModel: Model<ChatDoc>, msgModel: Model<MessageDoc>);
    createMessage(body: CreateMsg, user: UserDoc): Promise<{
        message: import("mongoose").Document<unknown, {}, MessageDoc> & MessageDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deleteMessage(messageId: mongodbId, user: UserDoc): Promise<{
        status: string;
        message: import("mongoose").Document<unknown, {}, MessageDoc> & MessageDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateMessage(messageId: mongodbId, body: UpdateMsg, user: UserDoc): Promise<{
        status: string;
        message: import("mongoose").Document<unknown, {}, MessageDoc> & MessageDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    private validateChat;
    getChatMessages(chatId: mongodbId, user: UserDoc): Promise<{
        messages: (import("mongoose").Document<unknown, {}, MessageDoc> & MessageDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
}
export {};
