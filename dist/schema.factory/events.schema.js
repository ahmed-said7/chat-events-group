"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSchema = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../enums/models");
class EventSchema {
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
            startedAt: Date,
            endedAt: Date,
            interested: [{
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: models_1.Models.User
                }],
            went: [{
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: models_1.Models.User
                }],
            likes: [{
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: models_1.Models.User
                }],
            comments: [{
                    user: { type: mongoose_1.Schema.Types.ObjectId, ref: models_1.Models.User },
                    content: { type: String }
                }],
            price: {
                type: Number,
                default: 0
            },
            averageRating: { type: Number, default: 0 },
            ratingQuantity: { type: Number, default: 0 },
            image: String,
            admin: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: models_1.Models.User
            }
        }, {
            timestamps: true
        });
        this.schema.index({ location: "2dsphere" });
        this.schema.index({ name: "text", "details": "text" });
        this.schema.post("init", function () {
            if (this.image) {
                this.image = `${process.env.url}/event/${this.image}`;
            }
        });
        this.schema.post("save", function () {
            if (this.image) {
                this.image = `${process.env.url}/event/${this.image}`;
            }
        });
    }
    ;
}
exports.EventSchema = EventSchema;
;
;
//# sourceMappingURL=events.schema.js.map