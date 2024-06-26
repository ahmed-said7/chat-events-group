"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProviderModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const models_1 = require("../enums/models");
const schema_module_1 = require("../schema.factory/schema.module");
const user_schema_1 = require("../schema.factory/user.schema");
const api_module_1 = require("../filter/api.module");
const user_service_schema_1 = require("../schema.factory/user.service.schema");
const userServices_service_1 = require("./userServices.service");
const userServices_controller_1 = require("./userServices.controller");
let ServiceProviderModule = class ServiceProviderModule {
};
exports.ServiceProviderModule = ServiceProviderModule;
exports.ServiceProviderModule = ServiceProviderModule = __decorate([
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
                    name: models_1.Models.Service,
                    imports: [schema_module_1.SchemaFactoryModule],
                    inject: [user_service_schema_1.ServiceProviderSchema],
                    useFactory: (srvSchema) => {
                        return srvSchema.schema;
                    }
                }
            ])
        ],
        providers: [{ provide: "folder", useValue: "service" }, userServices_service_1.ServiceProvider],
        controllers: [userServices_controller_1.ServiceProviderController]
    })
], ServiceProviderModule);
;
//# sourceMappingURL=userServices.module.js.map