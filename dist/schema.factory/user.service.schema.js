"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProviderSchema = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../enums/models");
class ServiceProviderSchema {
    constructor() {
        this.schema = new mongoose_1.Schema({
            name: {
                type: String,
                required: true,
                trim: true
            },
            details: String,
            location: [Number],
            address: String,
            price: Number,
            image: String,
            admin: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: models_1.Models.User
            }
        }, {
            timestamps: true
        });
        this.schema.index({ name: "text", details: "text" });
        this.schema.post("init", function () {
            if (this.image) {
                this.image = `${process.env.url}/service/${this.image}`;
            }
        });
        this.schema.post("save", function () {
            if (this.image) {
                this.image = `${process.env.url}/service/${this.image}`;
            }
        });
    }
    ;
}
exports.ServiceProviderSchema = ServiceProviderSchema;
;
;
//# sourceMappingURL=user.service.schema.js.map