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
exports.ServiceProviderController = void 0;
const common_1 = require("@nestjs/common");
const protect_user_1 = require("../guards/protect.user");
const current_user_1 = require("../decorator/current.user");
const validate_mogoid_1 = require("../pipes/validate.mogoid");
const file_interceptor_1 = require("../interceptor/file.interceptor");
const platform_express_1 = require("@nestjs/platform-express");
const userServices_service_1 = require("./userServices.service");
const userServices_create_dto_1 = require("./dto/userServices.create.dto");
const userServices_query_dto_1 = require("./dto/userServices.query.dto");
const userServices_update_dto_1 = require("./dto/userServices.update.dto");
let ServiceProviderController = class ServiceProviderController {
    constructor(srvProvider) {
        this.srvProvider = srvProvider;
    }
    ;
    createService(body, user) {
        return this.srvProvider.createServiceProvider(body, user);
    }
    ;
    getService(srvId) {
        return this.srvProvider.getServiceProvider(srvId);
    }
    ;
    getAllServices(query) {
        return this.srvProvider.getAllServicesProviders(query);
    }
    ;
    updateService(srvId, body, user) {
        return this.srvProvider.updateServiceProvider(srvId, body, user);
    }
    ;
    deleteService(srvId, user) {
        return this.srvProvider.deleteServiceProvider(srvId, user);
    }
    ;
};
exports.ServiceProviderController = ServiceProviderController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.FileInterceptorImage),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userServices_create_dto_1.CreateServicProviderDto, Object]),
    __metadata("design:returntype", void 0)
], ServiceProviderController.prototype, "createService", null);
__decorate([
    (0, common_1.Get)(":srvId"),
    __param(0, (0, common_1.Param)("srvId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ServiceProviderController.prototype, "getService", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userServices_query_dto_1.QueryServiceProviderDto]),
    __metadata("design:returntype", void 0)
], ServiceProviderController.prototype, "getAllServices", null);
__decorate([
    (0, common_1.Patch)(":srvId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.FileInterceptorImage),
    __param(0, (0, common_1.Param)("srvId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, userServices_update_dto_1.UpdateServiceProviderDto, Object]),
    __metadata("design:returntype", void 0)
], ServiceProviderController.prototype, "updateService", null);
__decorate([
    (0, common_1.Delete)(":srvId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("srvId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ServiceProviderController.prototype, "deleteService", null);
exports.ServiceProviderController = ServiceProviderController = __decorate([
    (0, common_1.Controller)("service"),
    __metadata("design:paramtypes", [userServices_service_1.ServiceProvider])
], ServiceProviderController);
;
//# sourceMappingURL=userServices.controller.js.map