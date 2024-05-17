import {  Controller,Post, Req } from "@nestjs/common";
import { Request, Response } from "express";



@Controller("paytab")
export class PaytabController {
    @Post()
    validateRequest(
        @Req() request:Request 
    ){
        console.log(request.body);
    };
    @Post("response")
    async getResponsePayment(){
        return { status:"paid" }
    };
};