"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInterceptorEventImages = void 0;
const common_1 = require("@nestjs/common");
const sharp = require("sharp");
const uuid_1 = require("uuid");
class FileInterceptorEventImages {
    async intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const { files } = req;
        if (Array.isArray(files)) {
            return next.handle();
        }
        ;
        if (!files.images && !files.imageCover) {
            return next.handle();
        }
        ;
        const obj = {};
        if (files.images) {
            obj.images = [];
            const result = files.images.map((img) => {
                if (!img.mimetype.startsWith('image')) {
                    throw new common_1.HttpException('Image only supported', 400);
                }
                ;
                const filename = `event-${Date.now()}-${(0, uuid_1.v4)()}.jpeg`;
                obj.images.push(filename);
                return sharp(img.buffer).resize(500, 500).toFormat('jpeg')
                    .jpeg({ quality: 90 }).toFile(`src/uploads/event/${filename}`);
            });
            await Promise.all(result);
        }
        req.body.images = obj.images;
        return next.handle();
    }
    ;
}
exports.FileInterceptorEventImages = FileInterceptorEventImages;
;
//# sourceMappingURL=event.file.interceptor.js.map