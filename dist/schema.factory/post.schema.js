"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const mongoose_1 = require("mongoose");
const models_1 = require("../enums/models");
class PostSchema {
    constructor() {
        this.schema = new mongoose_1.Schema({
            content: {
                type: String,
                required: true,
                trim: true
            },
            image: String,
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: models_1.Models.User
            },
            group: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: models_1.Models.Group
            },
            likes: [{
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: models_1.Models.User
                }],
            comments: [{
                    user: { type: mongoose_1.Schema.Types.ObjectId, ref: models_1.Models.User },
                    content: { required: true, type: String }
                }]
        }, {
            timestamps: true
        });
        const self = this;
        this.schema.post("init", function () {
            if (this.image) {
                this.image = `${process.env.url}/post/${this.image}`;
            }
        });
        this.schema.post("save", function () {
            if (this.image) {
                this.image = `${process.env.url}/post/${this.image}`;
            }
            ;
        });
    }
    ;
}
exports.PostSchema = PostSchema;
;
;
//# sourceMappingURL=post.schema.js.map