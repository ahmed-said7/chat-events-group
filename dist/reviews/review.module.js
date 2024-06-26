"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const models_1 = require("../enums/models");
const api_module_1 = require("../filter/api.module");
const review_schema_1 = require("../schema.factory/review.schema");
const schema_module_1 = require("../schema.factory/schema.module");
const user_schema_1 = require("../schema.factory/user.schema");
const review_service_1 = require("./review.service");
const review_controller_1 = require("./review.controller");
let ReviewModule = class ReviewModule {
};
exports.ReviewModule = ReviewModule;
exports.ReviewModule = ReviewModule = __decorate([
    (0, common_1.Module)({
        imports: [
            api_module_1.ApiModule, schema_module_1.SchemaFactoryModule,
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    imports: [schema_module_1.SchemaFactoryModule],
                    inject: [review_schema_1.ReviewSchema],
                    name: models_1.Models.Review,
                    useFactory: function (reviewSchema) {
                        return reviewSchema.schema;
                    }
                },
                {
                    imports: [schema_module_1.SchemaFactoryModule],
                    inject: [user_schema_1.UserSchema],
                    name: models_1.Models.User,
                    useFactory: function (userSchema) {
                        return userSchema.schema;
                    }
                }
            ])
        ],
        controllers: [review_controller_1.ReviewController],
        providers: [review_service_1.ReviewService]
    })
], ReviewModule);
;
//# sourceMappingURL=review.module.js.map