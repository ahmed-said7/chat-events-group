"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const group_module_1 = require("./group/group.module");
const chat_module_1 = require("./chat/chat.module");
const post_module_1 = require("./post/post.module");
const message_module_1 = require("./message/message.module");
const events_module_1 = require("./events/events.module");
const api_module_1 = require("./filter/api.module");
const schema_module_1 = require("./schema.factory/schema.module");
const websocket_module_1 = require("./websockets/websocket.module");
const userServices_module_1 = require("./user services/userServices.module");
const feed_module_1 = require("./feed/feed.module");
const core_1 = require("@nestjs/core");
const base_filter_1 = require("./errorHandler/base.filter");
const addresse_module_1 = require("./addresses/addresse.module");
const question_module_1 = require("./questions/question.module");
const paytab_module_1 = require("./paytab/paytab.module");
const event_emitter_1 = require("@nestjs/event-emitter");
const ticket_module_1 = require("./ticket/ticket.module");
const review_module_1 = require("./reviews/review.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            event_emitter_1.EventEmitterModule.forRoot({ global: true }),
            mongoose_1.MongooseModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    return { uri: config.get("mongo") };
                },
                imports: [config_1.ConfigModule]
            }),
            schema_module_1.SchemaFactoryModule,
            user_module_1.UserModule, group_module_1.GroupModule, chat_module_1.ChatModule,
            post_module_1.PostModule, message_module_1.MessageModule,
            events_module_1.EventModule, api_module_1.ApiModule, websocket_module_1.SocketModule, userServices_module_1.ServiceProviderModule,
            feed_module_1.FeedModule, addresse_module_1.AddresseModule, question_module_1.QuestionModule,
            paytab_module_1.PaytabModule, ticket_module_1.TicketModule, review_module_1.ReviewModule
        ],
        controllers: [],
        providers: [{
                provide: core_1.APP_FILTER,
                useClass: base_filter_1.catchExceptionsFilter
            }]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map