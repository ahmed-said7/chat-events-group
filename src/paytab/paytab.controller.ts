import {  Controller, Get, Param,Post, Req, Res, UseGuards } from "@nestjs/common";
import { Protected } from "src/guards/protect.user";
import { UserDoc } from "src/schema.factory/user.schema";
import { AuthUser } from "src/decorator/current.user";
import { ParseMongoId } from "src/pipes/validate.mogoid";
import { PaytabService } from "./paytab.service";
import { Request, Response } from "express";
import { mongodbId } from "src/group/group.service";



@Controller("paytab")
export class PaytabController {

    constructor(
        private paytabService:PaytabService
    ){};

    @Post("ticket")
    validatTicketPayment(
        @Req() request:Request 
    ){
        return this.paytabService.validateOfferCallback(request);
    };


    @Post("ticket/return")
    returnedTicketPayment(
        @Res() res:Response 
    ){
        const html=
        `<html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Payment Success</title>
            </head>
            <body style="font-family: Arial, sans-serif; background-color: #f0f0f0; text-align: center; padding: 20px;">
                <div style="background-color: #ffffff; border-radius: 8px; padding: 20px; max-width: 400px; margin: 0 auto;">
                    <h2 style="color: #4CAF50;">Payment Paid Successfully</h2>
                    <p style="color: #333333;">Thank you for your payment. Your transaction was successful.</p>
                </div>
            </body>
        </html>`;
        res.send({ status :" paid" });
    };
    @Get(":eventId")
    @UseGuards(Protected)
    createTicketPayment(
        @AuthUser() user:UserDoc,
        @Res() res:Response,
        @Param("eventId",ParseMongoId) eventId:mongodbId
    ){
        this.paytabService.createTicketPaymentUrl(res,eventId,user);
    };
};