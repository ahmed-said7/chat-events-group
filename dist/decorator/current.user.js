"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = void 0;
const common_1 = require("@nestjs/common");
exports.AuthUser = (0, common_1.createParamDecorator)(function (data, ctx) {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
//# sourceMappingURL=current.user.js.map