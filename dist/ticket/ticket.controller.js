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
exports.TicketController = void 0;
const common_1 = require("@nestjs/common");
const protect_user_1 = require("../guards/protect.user");
const ticket_service_1 = require("./ticket.service");
const query_ticket_dto_1 = require("./dto/query.ticket.dto");
const validate_mogoid_1 = require("../pipes/validate.mogoid");
const current_user_1 = require("../decorator/current.user");
let TicketController = class TicketController {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }
    ;
    getTicket(ticketId, user) {
        return this.ticketService.getTicket(ticketId, user);
    }
    ;
    getAllTickets(query, user) {
        return this.ticketService.getAllTickets(query, user);
    }
    ;
};
exports.TicketController = TicketController;
__decorate([
    (0, common_1.UseGuards)(protect_user_1.Protected),
    (0, common_1.Get)(":ticketId"),
    __param(0, (0, common_1.Param)("ticketId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getTicket", null);
__decorate([
    (0, common_1.UseGuards)(protect_user_1.Protected),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_ticket_dto_1.QueryTicketDto, Object]),
    __metadata("design:returntype", void 0)
], TicketController.prototype, "getAllTickets", null);
exports.TicketController = TicketController = __decorate([
    (0, common_1.Controller)("ticket"),
    __metadata("design:paramtypes", [ticket_service_1.TicketService])
], TicketController);
;
//# sourceMappingURL=ticket.controller.js.map