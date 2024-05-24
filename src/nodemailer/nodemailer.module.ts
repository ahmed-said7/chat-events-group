import { Module } from "@nestjs/common";
import { mailerService } from "./nodemailer.service";

@Module({
    providers:[mailerService],
    exports:[mailerService]
})
export class mailerModule {};