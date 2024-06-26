"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const models_1 = require("../enums/models");
const schema_module_1 = require("../schema.factory/schema.module");
const user_schema_1 = require("../schema.factory/user.schema");
const api_module_1 = require("../filter/api.module");
const ticket_service_1 = require("./ticket.service");
const ticket_controller_1 = require("./ticket.controller");
const ticket_schema_1 = require("../schema.factory/ticket.schema");
let TicketModule = class TicketModule {
};
exports.TicketModule = TicketModule;
exports.TicketModule = TicketModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.ApiModule,
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: models_1.Models.User,
                    imports: [schema_module_1.SchemaFactoryModule],
                    inject: [user_schema_1.UserSchema],
                    useFactory: (UserSchema) => {
                        return UserSchema.schema;
                    }
                },
                {
                    name: models_1.Models.Ticket,
                    imports: [schema_module_1.SchemaFactoryModule],
                    inject: [ticket_schema_1.TicketSchema],
                    useFactory: (ticketSchema) => {
                        return ticketSchema.schema;
                    }
                }
            ])
        ],
        providers: [ticket_service_1.TicketService],
        controllers: [ticket_controller_1.TicketController]
    })
], TicketModule);
;
//# sourceMappingURL=ticket.module.js.map