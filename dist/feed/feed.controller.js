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
exports.FeedController = void 0;
const common_1 = require("@nestjs/common");
const protect_user_1 = require("../guards/protect.user");
const feed_service_1 = require("./feed.service");
const current_user_1 = require("../decorator/current.user");
let FeedController = class FeedController {
    constructor(feedService) {
        this.feedService = feedService;
    }
    ;
    getFeed(user, page) {
        return this.feedService.getFeed(user, page);
    }
    ;
    getNewFeed(user, page) {
        return this.feedService.getNewFeed(user);
    }
    ;
};
exports.FeedController = FeedController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Query)("page")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "getFeed", null);
__decorate([
    (0, common_1.Get)("/new"),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Query)("page")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FeedController.prototype, "getNewFeed", null);
exports.FeedController = FeedController = __decorate([
    (0, common_1.Controller)("feed"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __metadata("design:paramtypes", [feed_service_1.FeedService])
], FeedController);
;
//# sourceMappingURL=feed.controller.js.map