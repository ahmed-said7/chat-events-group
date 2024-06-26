/// <reference types="cookie-parser" />
import { Request, Response } from "express";
import { UserDoc } from "src/schema.factory/user.schema";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { mongodbId } from "src/group/group.service";
interface metadata {
    cartId: mongodbId;
    price: number;
}
interface Urls {
    callback: string;
    response: string;
}
export declare class Paytab {
    private events;
    constructor(events: EventEmitter2);
    paymentUrlUsingAxios(res: Response, user: UserDoc, meta: metadata, url: Urls): Promise<void>;
    ValidateOfferPayment(req: Request): Promise<void>;
    private payUrl;
    private validationCallback;
}
export interface IResponsePaytab {
    tran_ref: string;
    tran_type: string;
    cart_id: string;
    cart_description: string;
    cart_currency: string;
    cart_amount: string;
    tran_currency: string;
    tran_total: string;
    customer_details: {
        name: string;
        email: string;
        phone: string;
        street1: string;
        city: string;
        state: string;
        country: string;
        ip: string;
    };
    shipping_details: {
        name: string;
        email: string;
        phone: string;
        street1: string;
        city: string;
        state: string;
        country: string;
    };
    payment_result: {
        response_status: string;
        response_code: string;
        response_message: string;
        transaction_time: string;
    };
    payment_info: {
        payment_method: string;
        card_type: string;
        card_scheme: string;
        payment_description: string;
        expiryMonth: number;
        expiryYear: number;
    };
    serviceId: number;
    profileId: number;
    merchantId: number;
    trace: string;
}
export {};
