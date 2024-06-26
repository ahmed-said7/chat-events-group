"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketModule = void 0;
const common_1 = require("@nestjs/common");
const websocket_gateway_1 = require("./websocket.gateway");
const websocket_service_1 = require("./websocket.service");
const models_1 = require("../enums/models");
const schema_module_1 = require("../schema.factory/schema.module");
const user_schema_1 = require("../schema.factory/user.schema");
const mongoose_1 = require("@nestjs/mongoose");
let SocketModule = class SocketModule {
};
exports.SocketModule = SocketModule;
exports.SocketModule = SocketModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: models_1.Models.User,
                    imports: [schema_module_1.SchemaFactoryModule],
                    inject: [user_schema_1.UserSchema],
                    useFactory: (UserSchema) => {
                        return UserSchema.schema;
                    }
                }
            ])
        ],
        providers: [websocket_gateway_1.WebSocketEvents, websocket_service_1.WebsocketService]
    })
], SocketModule);
;
//# sourceMappingURL=websocket.module.js.map