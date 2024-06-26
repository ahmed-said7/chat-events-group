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
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../enums/models");
const api_service_1 = require("../filter/api.service");
let TicketService = class TicketService {
    constructor(ticketModel, filter) {
        this.ticketModel = ticketModel;
        this.filter = filter;
    }
    ;
    async getTicket(ticketId, user) {
        const ticketExists = await this.ticketModel
            .findById(ticketId).populate(["owner", "user", "event"]);
        if (!ticketExists) {
            throw new common_1.HttpException("ticket not found", 400);
        }
        ;
        if (user.role != "user") {
            return { ticket: ticketExists };
        }
        if (user._id.toString() != ticketExists.owner?._id?.toString() &&
            user._id.toString() != ticketExists.user?._id?.toString()) {
            throw new common_1.HttpException("you are not allowed to get this ticket", 400);
        }
        ;
        return { ticket: ticketExists };
    }
    ;
    async getAllTickets(query, user) {
        let obj = {};
        if (user.role == "user") {
            obj = { $or: [{ owner: user._id }, { user: user._id }] };
        }
        ;
        const { paginationObj, query: data } = await this.filter
            .filter(this.ticketModel.find(), { ...query, ...obj }).select()
            .sort().population(["owner", "user", "event"])
            .search().pagination();
        let tickets = await data;
        return { tickets, paginationObj };
    }
    ;
};
exports.TicketService = TicketService;
exports.TicketService = TicketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.Models.Ticket)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        api_service_1.apiFeatures])
], TicketService);
//# sourceMappingURL=ticket.service.js.map