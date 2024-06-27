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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaytabController = void 0;
const common_1 = require("@nestjs/common");
const protect_user_1 = require("../guards/protect.user");
const current_user_1 = require("../decorator/current.user");
const validate_mogoid_1 = require("../pipes/validate.mogoid");
const paytab_service_1 = require("./paytab.service");
let PaytabController = class PaytabController {
    constructor(paytabService) {
        this.paytabService = paytabService;
    }
    ;
    validatTicketPayment(request) {
        return this.paytabService.validateOfferCallback(request);
    }
    ;
    returnedTicketPayment(res) {
        const html = `<html lang="en">
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
        res.send(html);
    }
    ;
    createTicketPayment(user, res, eventId) {
        return this.paytabService.createTicketPaymentUrl(res, eventId, user);
    }
    ;
};
exports.PaytabController = PaytabController;
__decorate([
    (0, common_1.Post)("ticket"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaytabController.prototype, "validatTicketPayment", null);
__decorate([
    (0, common_1.Post)("ticket/return"),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaytabController.prototype, "returnedTicketPayment", null);
__decorate([
    (0, common_1.Get)(":eventId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], PaytabController.prototype, "createTicketPayment", null);
exports.PaytabController = PaytabController = __decorate([
    (0, common_1.Controller)("paytab"),
    __metadata("design:paramtypes", [paytab_service_1.PaytabService])
], PaytabController);
;
//# sourceMappingURL=paytab.controller.js.map