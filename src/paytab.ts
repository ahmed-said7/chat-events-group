import {  Controller,Post, Req } from "@nestjs/common";
import { Request, Response } from "express";



@Controller("paytab")
export class PaytabController {
    @Post()
    validateRequest(
        @Req() request:Request 
    ){
        console.log(request.body.tran_ref,"1")
        // console.log(request.body);
    };
    @Post("response")
    async getResponsePayment(@Req() request:Request){
        console.log(request.body,"2")
        return { status:"paid" }
    };
};