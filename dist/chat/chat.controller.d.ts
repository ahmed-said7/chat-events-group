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
import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create.chat";
import { UserDoc } from "src/schema.factory/user.schema";
import { mongodbId } from "src/group/group.service";
import { UpdateChatDto } from "./dto/update.chat";
export declare class ChatController {
    private chatService;
    constructor(chatService: ChatService);
    createChat(body: CreateChatDto, user: UserDoc): Promise<{
        chat: import("mongoose").Document<unknown, {}, import("../schema.factory/chat.schema").ChatDoc> & import("../schema.factory/chat.schema").ChatDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getUserChats(user: UserDoc): Promise<{
        chats: (import("mongoose").Document<unknown, {}, import("../schema.factory/chat.schema").ChatDoc> & import("../schema.factory/chat.schema").ChatDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    deleteChat(id: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    getChatMembers(id: mongodbId, user: UserDoc): Promise<{
        admin: import("mongoose").Schema.Types.ObjectId;
        user: import("mongoose").Schema.Types.ObjectId;
    }>;
    updateChat(body: UpdateChatDto, id: mongodbId, user: UserDoc): Promise<{
        chat: import("mongoose").Document<unknown, {}, import("../schema.factory/chat.schema").ChatDoc> & import("../schema.factory/chat.schema").ChatDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
}
