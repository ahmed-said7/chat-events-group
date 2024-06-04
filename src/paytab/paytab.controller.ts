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
        @Req() request:Request 
    ){
        return { status : "paid" };
    };
    @Get(":eventId")
    @UseGuards(Protected)
    createTicketPayment(
        @AuthUser() user:UserDoc,
        @Res() res:Response,
        @Param("eventId",ParseMongoId) eventId:mongodbId
    ){
        return this.paytabService.createTicketPaymentUrl(res,eventId,user);
    };
};