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
import { UserDoc } from "src/schema.factory/user.schema";
import { mongodbId } from "src/group/group.service";
import { apiFeatures } from "src/filter/api.service";
import { TicketDoc } from "src/schema.factory/ticket.schema";
import { QueryTicketDto } from "./dto/query.ticket.dto";
export declare class TicketService {
    private ticketModel;
    private filter;
    constructor(ticketModel: Model<TicketDoc>, filter: apiFeatures<TicketDoc, QueryTicketDto>);
    getTicket(ticketId: mongodbId, user: UserDoc): Promise<{
        ticket: import("mongoose").Document<unknown, {}, TicketDoc> & TicketDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getAllTickets(query: QueryTicketDto, user: UserDoc): Promise<{
        tickets: TicketDoc[];
        paginationObj: import("src/filter/api.service").Pagination;
    }>;
}
