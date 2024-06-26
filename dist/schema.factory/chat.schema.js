"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSchema = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../enums/models");
class ChatSchema {
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
            lastMessage: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: models_1.Models.Message
            },
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: models_1.Models.User
            }
        }, {
            timestamps: true
        });
        this.schema.index({ name: "text" });
        this.schema.post("init", function () {
            if (this.image) {
                this.image = `${process.env.url}/chat/${this.image}`;
            }
        });
        this.schema.post("save", function () {
            if (this.image) {
                this.image = `${process.env.url}/chat/${this.image}`;
            }
        });
    }
    ;
}
exports.ChatSchema = ChatSchema;
;
;
//# sourceMappingURL=chat.schema.js.map