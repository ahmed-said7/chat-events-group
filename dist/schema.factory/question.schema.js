"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionSchema = void 0;
const mongoose_1 = require("mongoose");
class QuestionSchema {
    constructor() {
        this.schema = new mongoose_1.Schema({
            question: {
                type: String,
                trim: true
            },
            answer: String
        }, {
            timestamps: true
        });
    }
}
exports.QuestionSchema = QuestionSchema;
;
;
//# sourceMappingURL=question.schema.js.map