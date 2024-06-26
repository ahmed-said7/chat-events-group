"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const models_1 = require("../enums/models");
const chat_schema_1 = require("../schema.factory/chat.schema");
const message_schema_1 = require("../schema.factory/message.schema");
const schema_module_1 = require("../schema.factory/schema.module");
const user_schema_1 = require("../schema.factory/user.schema");
const message_service_1 = require("./message.service");
const message_controller_1 = require("./message.controller");
let MessageModule = class MessageModule {
};
exports.MessageModule = MessageModule;
exports.MessageModule = MessageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: models_1.Models.Chat,
                    useFactory: function (chatSchema) {
                        return chatSchema.schema;
                    },
                    inject: [chat_schema_1.ChatSchema],
                    imports: [schema_module_1.SchemaFactoryModule]
                },
                {
                    name: models_1.Models.User,
                    imports: [schema_module_1.SchemaFactoryModule],
                    inject: [user_schema_1.UserSchema],
                    useFactory: (UserSchema) => {
                        return UserSchema.schema;
                    }
                },
                {
                    name: models_1.Models.Message,
                    imports: [schema_module_1.SchemaFactoryModule],
                    inject: [message_schema_1.MessageSchema],
                    useFactory: (msgSchema) => {
                        return msgSchema.schema;
                    }
                }
            ])
        ],
        providers: [message_service_1.MessageService, { provide: "folder", useValue: "message" }],
        controllers: [message_controller_1.MessageController]
    })
], MessageModule);
;
//# sourceMappingURL=message.module.js.map