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
import { EventService } from "./events.service";
import { CreateEventDto } from "./dto/event.create.dto";
import { UserDoc } from "src/schema.factory/user.schema";
import { mongodbId } from "src/group/group.service";
import { QueryEventDto } from "./dto/event.query.dto";
import { UpdateEventDto } from "./dto/update.event.dto";
import { CreateCommentDto } from "./dto/comment.create.dto";
import { UpdateCommentDto } from "./dto/update.comment.dto";
export declare class EventController {
    private eventService;
    constructor(eventService: EventService);
    addUserInterestToEvent(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    deleteUserInterestFromEvent(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    getUserInterestedForEvent(eventId: mongodbId): Promise<{
        interested: import("mongoose").Schema.Types.ObjectId[];
    }>;
    addUserToEventWentList(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    deleteUserFromEventWentList(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    getEventWentList(eventId: mongodbId): Promise<{
        attended: import("mongoose").Schema.Types.ObjectId[];
    }>;
    getEventByDistance(location: string, distance: number): Promise<import("@nestjs/common").HttpException | {
        events: (import("mongoose").Document<unknown, {}, import("../schema.factory/events.schema").EventDoc> & import("../schema.factory/events.schema").EventDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    createEvent(body: CreateEventDto, user: UserDoc): Promise<{
        event: import("mongoose").Document<unknown, {}, import("../schema.factory/events.schema").EventDoc> & import("../schema.factory/events.schema").EventDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getAllEvents(query: QueryEventDto): Promise<{
        events: import("../schema.factory/events.schema").EventDoc[];
        paginationObj: import("../filter/api.service").Pagination;
    }>;
    updateEvent(eventId: mongodbId, body: UpdateEventDto, user: UserDoc): Promise<{
        event: import("mongoose").Document<unknown, {}, import("../schema.factory/events.schema").EventDoc> & import("../schema.factory/events.schema").EventDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deleteEvent(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    createEventComment(eventId: mongodbId, body: CreateCommentDto, user: UserDoc): Promise<{
        status: string;
        comment: {
            _id?: import("mongoose").Schema.Types.ObjectId;
            user: import("mongoose").Schema.Types.ObjectId;
            content: string;
        };
    }>;
    deleteEventComment(eventId: mongodbId, commentId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    updateEventComment(eventId: mongodbId, commentId: mongodbId, body: UpdateCommentDto, user: UserDoc): Promise<{
        status: string;
        comment: {
            _id?: import("mongoose").Schema.Types.ObjectId;
            user: import("mongoose").Schema.Types.ObjectId;
            content: string;
        };
    }>;
    addEventLike(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    removeEventLike(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    getEventLikes(eventId: mongodbId): Promise<{
        likes: import("mongoose").Schema.Types.ObjectId[];
    }>;
    addSavedEvent(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    removeSavedEvent(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    getSavedEvents(user: UserDoc): Promise<{
        events: import("mongoose").Schema.Types.ObjectId[];
    }>;
    getFavoriteEvents(user: UserDoc): Promise<{
        events: (import("mongoose").Document<unknown, {}, import("../schema.factory/events.schema").EventDoc> & import("../schema.factory/events.schema").EventDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getEvent(eventId: mongodbId): Promise<{
        event: import("mongoose").Document<unknown, {}, import("../schema.factory/events.schema").EventDoc> & import("../schema.factory/events.schema").EventDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
}
