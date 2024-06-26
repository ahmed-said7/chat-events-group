"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let mailerService = class mailerService {
    constructor(config) {
        this.config = config;
        this.from = "maskeni";
        this.transport = nodemailer.createTransport({
            host: this.config.get("host"),
            port: this.config.get("port"),
            secure: this.config.get("secure"),
            auth: {
                user: this.config.get("user"),
                pass: this.config.get("pass")
            }
        });
    }
    ;
    async sendWelcome(body) {
        const to = body.email;
        const subject = 'welcome to our website maskeni';
        const text = `
                We're thrilled to have you join our community.
                To get started, 
                please verify your account using otp 
                code is ${body.resetCode}
            `;
        return this.sendMail({ from: this.from, to, subject, text });
    }
    ;
    sendChangeingPasswordCode(body) {
        const to = body.email;
        const subject = 'reset code to change your password';
        const text = `your reset code to change your passsword is ${body.resetCode}`;
        const from = 'e-shop';
        return this.sendMail({ from: this.from, to, subject, text });
    }
    ;
    sendMail(opts) {
        return this.transport.sendMail(opts);
    }
    ;
    resetCode() {
        return String(Math.floor(1000 + Math.random() * 8000));
    }
    ;
};
exports.mailerService = mailerService;
exports.mailerService = mailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], mailerService);
;
//# sourceMappingURL=nodemailer.service.js.map