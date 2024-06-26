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
import { HttpException } from "@nestjs/common";
import { Model } from "mongoose";
import { EventDoc } from "src/schema.factory/events.schema";
import { UserDoc } from "src/schema.factory/user.schema";
import { CreateEventDto } from "./dto/event.create.dto";
import { UpdateEventDto } from "./dto/update.event.dto";
import { mongodbId } from "src/group/group.service";
import { apiFeatures } from "src/filter/api.service";
import { QueryEventDto } from "./dto/event.query.dto";
interface CreateComment {
    content: string;
    user?: mongodbId;
}
interface UpdateComment {
    content?: string;
}
export declare class EventService {
    private eventModel;
    private userModel;
    private filter;
    constructor(eventModel: Model<EventDoc>, userModel: Model<UserDoc>, filter: apiFeatures<EventDoc, QueryEventDto>);
    createEvent(body: CreateEventDto, user: UserDoc): Promise<{
        event: import("mongoose").Document<unknown, {}, EventDoc> & EventDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateEvent(eventId: mongodbId, body: UpdateEventDto, user: UserDoc): Promise<{
        event: import("mongoose").Document<unknown, {}, EventDoc> & EventDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deleteEvent(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    getEvent(eventId: mongodbId): Promise<{
        event: import("mongoose").Document<unknown, {}, EventDoc> & EventDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getAllEvents(query: QueryEventDto): Promise<{
        events: EventDoc[];
        paginationObj: import("src/filter/api.service").Pagination;
    }>;
    addInterestUserToEvent(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    removeInterestUserFromEvent(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    addWentUserToEvent(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    removeWentUserFromEvent(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    getEventsByRadius(location: string, distance: number): Promise<HttpException | {
        events: (import("mongoose").Document<unknown, {}, EventDoc> & EventDoc & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getUserInterestedEvents(eventId: mongodbId): Promise<{
        interested: import("mongoose").Schema.Types.ObjectId[];
    }>;
    getUserWentEvents(eventId: mongodbId): Promise<{
        attended: import("mongoose").Schema.Types.ObjectId[];
    }>;
    addEventToSave(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    removeEventFromSave(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    addLikeToEvent(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    removeLikeFromEvent(eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    getSavedEvents(user: UserDoc): Promise<{
        events: import("mongoose").Schema.Types.ObjectId[];
    }>;
    getEventLikes(eventId: mongodbId): Promise<{
        likes: import("mongoose").Schema.Types.ObjectId[];
    }>;
    addComment(body: CreateComment, eventId: mongodbId, user: UserDoc): Promise<{
        status: string;
        comment: {
            _id?: import("mongoose").Schema.Types.ObjectId;
            user: import("mongoose").Schema.Types.ObjectId;
            content: string;
        };
    }>;
    removeComment(eventId: mongodbId, commentId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    updateComment(body: UpdateComment, eventId: mongodbId, commentId: mongodbId, user: UserDoc): Promise<{
        status: string;
        comment: {
            _id?: import("mongoose").Schema.Types.ObjectId;
            user: import("mongoose").Schema.Types.ObjectId;
            content: string;
        };
    }>;
    getComments(eventId: mongodbId): Promise<{
        comments: {
            _id?: import("mongoose").Schema.Types.ObjectId;
            user: import("mongoose").Schema.Types.ObjectId;
            content: string;
        }[];
    }>;
}
export {};
