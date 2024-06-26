"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseMongoId = void 0;
const common_1 = require("@nestjs/common");
class ParseMongoId {
    transform(value, metadata) {
        if (/^[0-9a-fA-F]{24}$/.test(value)) {
            return value;
        }
        ;
        throw new common_1.HttpException("provide a vaild mongodb id", 400);
    }
    ;
}
exports.ParseMongoId = ParseMongoId;
;
//# sourceMappingURL=validate.mogoid.js.map