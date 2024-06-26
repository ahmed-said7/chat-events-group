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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupSchema = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const models_1 = require("../enums/models");
let GroupSchema = class GroupSchema {
    constructor() {
        this.schema = new mongoose_1.Schema({
            name: {
                type: String,
                required: true,
                trim: true
            },
            image: String,
            admin: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: models_1.Models.User
            },
            users: [{
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: models_1.Models.User
                }],
            requests: [{
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: models_1.Models.User
                }]
        }, {
            timestamps: true
        });
        this.schema.index({ name: "text" });
        this.schema.post("init", function () {
            if (this.image) {
                this.image = `${process.env.url}/group/${this.image}`;
            }
        });
        this.schema.post("save", function () {
            if (this.image) {
                this.image = `${process.env.url}/group/${this.image}`;
            }
        });
    }
    ;
};
exports.GroupSchema = GroupSchema;
exports.GroupSchema = GroupSchema = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], GroupSchema);
;
;
//# sourceMappingURL=group.schema.js.map