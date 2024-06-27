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
/// <reference types="mongoose/types/inferschematype" />
import { UserDoc } from "src/schema.factory/user.schema";
import { Model } from "mongoose";
import { Request, Response } from "express";
import { Paytab } from "./paytab";
import { EventDoc } from "src/schema.factory/events.schema";
import { mongodbId } from "src/group/group.service";
import { TicketDoc } from "src/schema.factory/ticket.schema";
import { ConfigService } from "@nestjs/config";
export declare class PaytabService {
    private paytab;
    private config;
    private eventModel;
    private ticketModel;
    constructor(paytab: Paytab, config: ConfigService, eventModel: Model<EventDoc>, ticketModel: Model<TicketDoc>);
    createTicketPaymentUrl(res: Response, eventId: mongodbId, user: UserDoc): Promise<void>;
    validateOfferCallback(req: Request): Promise<void>;
    private ticketPaymentCreated;
}
