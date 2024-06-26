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
import { TicketService } from "./ticket.service";
import { QueryTicketDto } from "./dto/query.ticket.dto";
import { mongodbId } from "src/group/group.service";
import { UserDoc } from "src/schema.factory/user.schema";
export declare class TicketController {
    private ticketService;
    constructor(ticketService: TicketService);
    getTicket(ticketId: mongodbId, user: UserDoc): Promise<{
        ticket: import("mongoose").Document<unknown, {}, import("../schema.factory/ticket.schema").TicketDoc> & import("../schema.factory/ticket.schema").TicketDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getAllTickets(query: QueryTicketDto, user: UserDoc): Promise<{
        tickets: import("../schema.factory/ticket.schema").TicketDoc[];
        paginationObj: import("../filter/api.service").Pagination;
    }>;
}
