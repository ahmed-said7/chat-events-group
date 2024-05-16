import { Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";

@Controller("paytab")
export class paytabController {
    @Post()
    logQuery(@Req() req:Request ){
        console.log(req.query);
    }
};