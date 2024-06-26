"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInterceptorImage = void 0;
const common_1 = require("@nestjs/common");
const sharp = require("sharp");
const uuid_1 = require("uuid");
let FileInterceptorImage = class FileInterceptorImage {
    constructor(folder) {
        this.folder = folder;
    }
    ;
    async intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const { file } = req;
        if (!file) {
            return next.handle();
        }
        if (!file.mimetype.startsWith('image')) {
            throw new common_1.HttpException('file type should be image', 400);
        }
        ;
        const filename = `${this.folder}-${Date.now()}-${(0, uuid_1.v4)()}.jpeg`;
        await sharp(file.buffer)
            .resize(500, 500).toFormat('jpeg')
            .jpeg({ quality: 80 })
            .toFile(`src/uploads/${this.folder}/${filename}`);
        req.body.image = filename;
        return next.handle();
    }
    ;
};
exports.FileInterceptorImage = FileInterceptorImage;
exports.FileInterceptorImage = FileInterceptorImage = __decorate([
    __param(0, (0, common_1.Inject)('folder')),
    __metadata("design:paramtypes", [String])
], FileInterceptorImage);
;
//# sourceMappingURL=file.interceptor.js.map