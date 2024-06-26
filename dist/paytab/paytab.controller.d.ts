/// <reference types="cookie-parser" />
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
import { UserDoc } from "src/schema.factory/user.schema";
import { PaytabService } from "./paytab.service";
import { Request, Response } from "express";
import { mongodbId } from "src/group/group.service";
export declare class PaytabController {
    private paytabService;
    constructor(paytabService: PaytabService);
    validatTicketPayment(request: Request): Promise<void>;
    returnedTicketPayment(request: Request): {
        status: string;
    };
    createTicketPayment(user: UserDoc, res: Response, eventId: mongodbId): Promise<void | {
        ticket: import("mongoose").Document<unknown, {}, import("../schema.factory/ticket.schema").TicketDoc> & import("../schema.factory/ticket.schema").TicketDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
}
