/// <reference types="cookie-parser" />
import { UserDoc } from "src/schema.factory/user.schema";
import { PaytabService } from "./paytab.service";
import { Request, Response } from "express";
import { mongodbId } from "src/group/group.service";
export declare class PaytabController {
    private paytabService;
    constructor(paytabService: PaytabService);
    validatTicketPayment(request: Request): Promise<void>;
    returnedTicketPayment(res: Response): void;
    createTicketPayment(user: UserDoc, res: Response, eventId: mongodbId): void;
}
