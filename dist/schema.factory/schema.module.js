"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaFactoryModule = void 0;
const common_1 = require("@nestjs/common");
const user_schema_1 = require("./user.schema");
const chat_schema_1 = require("./chat.schema");
const group_schema_1 = require("./group.schema");
const post_schema_1 = require("./post.schema");
const message_schema_1 = require("./message.schema");
const events_schema_1 = require("./events.schema");
const config_1 = require("@nestjs/config");
const user_service_schema_1 = require("./user.service.schema");
const contact_schema_1 = require("./contact.schema");
const question_schema_1 = require("./question.schema");
const ticket_schema_1 = require("./ticket.schema");
const review_schema_1 = require("./review.schema");
let SchemaFactoryModule = class SchemaFactoryModule {
};
exports.SchemaFactoryModule = SchemaFactoryModule;
exports.SchemaFactoryModule = SchemaFactoryModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot()],
        providers: [
            user_schema_1.UserSchema, chat_schema_1.ChatSchema, group_schema_1.GroupSchema,
            post_schema_1.PostSchema, message_schema_1.MessageSchema, events_schema_1.EventSchema, user_service_schema_1.ServiceProviderSchema,
            contact_schema_1.ContactSchema, question_schema_1.QuestionSchema, ticket_schema_1.TicketSchema, review_schema_1.ReviewSchema
        ],
        exports: [
            user_schema_1.UserSchema, chat_schema_1.ChatSchema, group_schema_1.GroupSchema, post_schema_1.PostSchema,
            message_schema_1.MessageSchema, events_schema_1.EventSchema, user_service_schema_1.ServiceProviderSchema,
            contact_schema_1.ContactSchema, question_schema_1.QuestionSchema, ticket_schema_1.TicketSchema, review_schema_1.ReviewSchema
        ]
    })
], SchemaFactoryModule);
;
//# sourceMappingURL=schema.module.js.map