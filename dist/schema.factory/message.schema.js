"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../enums/models");
class MessageSchema {
    constructor() {
        this.schema = new mongoose_1.Schema({
            content: {
                type: String,
                trim: true
            },
            image: String,
            chat: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: models_1.Models.Chat
            },
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: models_1.Models.User
            }
        }, {
            timestamps: true
        });
        this.schema.post("init", function () {
            if (this.image) {
                this.image = `${process.env.url}/message/${this.image}`;
            }
        });
        this.schema.post("save", function () {
            if (this.image) {
                this.image = `${process.env.url}/message/${this.image}`;
            }
        });
    }
    ;
}
exports.MessageSchema = MessageSchema;
;
;
//# sourceMappingURL=message.schema.js.map