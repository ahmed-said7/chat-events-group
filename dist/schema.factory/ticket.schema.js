"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketSchema = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../enums/models");
class TicketSchema {
    constructor() {
        this.schema = new mongoose_1.Schema({
            paidAt: {
                type: Date
            },
            isPaid: {
                type: Boolean,
                default: false
            },
            price: {
                type: Number,
                default: 0
            },
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: models_1.Models.User
            },
            event: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: models_1.Models.Event
            },
            owner: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: models_1.Models.User
            }
        }, {
            timestamps: true
        });
    }
}
exports.TicketSchema = TicketSchema;
;
;
//# sourceMappingURL=ticket.schema.js.map