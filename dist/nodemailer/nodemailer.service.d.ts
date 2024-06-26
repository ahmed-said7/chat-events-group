import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
export declare class mailerService {
    private config;
    transport: nodemailer.Transporter;
    from: string;
    constructor(config: ConfigService);
    sendWelcome(body: {
        email: string;
        resetCode: string;
    }): Promise<any>;
    sendChangeingPasswordCode(body: {
        email: string;
        resetCode: string;
    }): Promise<any>;
    private sendMail;
    resetCode(): string;
}
