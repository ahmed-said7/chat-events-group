"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaytabModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const models_1 = require("../enums/models");
const api_module_1 = require("../filter/api.module");
const schema_module_1 = require("../schema.factory/schema.module");
const user_schema_1 = require("../schema.factory/user.schema");
const paytab_service_1 = require("./paytab.service");
const paytab_controller_1 = require("./paytab.controller");
const paytab_1 = require("./paytab");
const ticket_schema_1 = require("../schema.factory/ticket.schema");
const events_schema_1 = require("../schema.factory/events.schema");
let PaytabModule = class PaytabModule {
};
exports.PaytabModule = PaytabModule;
exports.PaytabModule = PaytabModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.ApiModule, schema_module_1.SchemaFactoryModule,
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    imports: [schema_module_1.SchemaFactoryModule],
                    inject: [user_schema_1.UserSchema],
                    name: models_1.Models.User,
                    useFactory: function (userSchema) {
                        return userSchema.schema;
                    }
                },
                {
                    imports: [schema_module_1.SchemaFactoryModule],
                    inject: [events_schema_1.EventSchema],
                    name: models_1.Models.Event,
                    useFactory: function (eventSchema) {
                        return eventSchema.schema;
                    }
                },
                {
                    imports: [schema_module_1.SchemaFactoryModule],
                    inject: [ticket_schema_1.TicketSchema],
                    name: models_1.Models.Ticket,
                    useFactory: function (ticketSchema) {
                        return ticketSchema.schema;
                    }
                }
            ])
        ],
        controllers: [paytab_controller_1.PaytabController],
        providers: [paytab_1.Paytab, paytab_service_1.PaytabService]
    })
], PaytabModule);
;
//# sourceMappingURL=paytab.module.js.map