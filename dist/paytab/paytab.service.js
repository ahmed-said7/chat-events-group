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
exports.PaytabService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const models_1 = require("../enums/models");
const mongoose_2 = require("mongoose");
const event_emitter_1 = require("@nestjs/event-emitter");
const paytab_1 = require("./paytab");
const config_1 = require("@nestjs/config");
let PaytabService = class PaytabService {
    constructor(paytab, config, eventModel, ticketModel) {
        this.paytab = paytab;
        this.config = config;
        this.eventModel = eventModel;
        this.ticketModel = ticketModel;
    }
    async createTicketPaymentUrl(res, eventId, user) {
        const event = await this.eventModel.findById(eventId);
        const ticket = await this.ticketModel.create({
            price: event.price,
            user: user._id,
            owner: event.admin,
            event: event._id
        });
        if (ticket.price == 0) {
            ticket.isPaid = true;
            ticket.paidAt = new Date();
            await ticket.save();
            res.status(200).json({ ticket });
        }
        ;
        const meta = { price: ticket.price, cartId: ticket._id };
        const urls = {
            callback: this.config.get("callback"),
            response: this.config.get("response")
        };
        this.paytab.paymentUrlUsingAxios(res, user, meta, urls);
    }
    ;
    async validateOfferCallback(req) {
        this.paytab.ValidateOfferPayment(req);
    }
    ;
    async ticketPaymentCreated(data) {
        const ticket = await this.ticketModel.findByIdAndUpdate(data.cart_id, {
            isPaid: true,
            paidAt: new Date()
        });
        console.log(ticket);
        if (!ticket) {
            console.log("No offer found", 400);
            return;
        }
        ;
    }
    ;
};
exports.PaytabService = PaytabService;
__decorate([
    (0, event_emitter_1.OnEvent)("ticket.payment"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaytabService.prototype, "ticketPaymentCreated", null);
exports.PaytabService = PaytabService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)(models_1.Models.Event)),
    __param(3, (0, mongoose_1.InjectModel)(models_1.Models.Ticket)),
    __metadata("design:paramtypes", [paytab_1.Paytab,
        config_1.ConfigService,
        mongoose_2.Model,
        mongoose_2.Model])
], PaytabService);
;
//# sourceMappingURL=paytab.service.js.map