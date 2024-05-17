// import {  Controller,Post, Req } from "@nestjs/common";
// import { Request, Response } from "express";



// @Controller("paytab")
// export class PaytabController {
//     @Post()
//     validateRequest(
//         @Req() request:Request 
//     ){
//         console.log(request.body,request.query,"1")
//         // console.log(request.body);
//         return { server:"server callback" };
//     };
//     @Post("response")
//     async getResponsePayment(@Req() request:Request){
//         console.log(request.body,request.query,"2")
//         return { status:"paid" };
//     };
// };