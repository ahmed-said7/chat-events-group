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
import { CreateMessageDto } from "./dto/create.message.dto";
import { UserDoc } from "src/schema.factory/user.schema";
import { MessageService } from "./message.service";
import { mongodbId } from "src/group/group.service";
import { UpdateMessageDto } from "./dto/update.message.dto";
export declare class MessageController {
    private msgService;
    constructor(msgService: MessageService);
    createMessage(body: CreateMessageDto, user: UserDoc): Promise<{
        message: import("mongoose").Document<unknown, {}, import("../schema.factory/message.schema").MessageDoc> & import("../schema.factory/message.schema").MessageDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getChatMessages(chatId: mongodbId, user: UserDoc): Promise<{
        messages: (import("mongoose").Document<unknown, {}, import("../schema.factory/message.schema").MessageDoc> & import("../schema.factory/message.schema").MessageDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    updateMessage(messageId: mongodbId, body: UpdateMessageDto, user: UserDoc): Promise<{
        status: string;
        message: import("mongoose").Document<unknown, {}, import("../schema.factory/message.schema").MessageDoc> & import("../schema.factory/message.schema").MessageDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deleteMessages(messageId: mongodbId, user: UserDoc): Promise<{
        status: string;
        message: import("mongoose").Document<unknown, {}, import("../schema.factory/message.schema").MessageDoc> & import("../schema.factory/message.schema").MessageDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
}
