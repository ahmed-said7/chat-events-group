import { Controller, Req } from "@nestjs/common";
import { Request } from "express";

@Controller("paytab")
export class paytabController {
    logQuery(@Req() req:Request ){
        console.log(req.query);
    }
};