"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const models_1 = require("../enums/models");
const group_schema_1 = require("../schema.factory/group.schema");
const post_schema_1 = require("../schema.factory/post.schema");
const schema_module_1 = require("../schema.factory/schema.module");
const user_schema_1 = require("../schema.factory/user.schema");
const post_service_1 = require("./post.service");
const post_controller_1 = require("./post.controller");
let PostModule = class PostModule {
};
exports.PostModule = PostModule;
exports.PostModule = PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: models_1.Models.Post,
                    useFactory: function (postSchema) {
                        return postSchema.schema;
                    },
                    inject: [post_schema_1.PostSchema],
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
                    name: models_1.Models.Group,
                    imports: [schema_module_1.SchemaFactoryModule],
                    inject: [group_schema_1.GroupSchema],
                    useFactory: (groupSchema) => {
                        return groupSchema.schema;
                    }
                }
            ])
        ],
        providers: [post_service_1.PostService, { provide: "folder", useValue: "post" }],
        controllers: [post_controller_1.PostController]
    })
], PostModule);
;
//# sourceMappingURL=post.module.js.map