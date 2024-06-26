"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSchema = void 0;
const mongoose_1 = require("mongoose");
class ContactSchema {
    constructor() {
        this.schema = new mongoose_1.Schema({
            phone: {
                type: String,
                trim: true
            },
            email: String,
            message: String
        }, {
            timestamps: true
        });
    }
}
exports.ContactSchema = ContactSchema;
;
;
//# sourceMappingURL=contact.schema.js.map