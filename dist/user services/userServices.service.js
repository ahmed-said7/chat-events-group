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
exports.ServiceProvider = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../enums/models");
const api_service_1 = require("../filter/api.service");
let ServiceProvider = class ServiceProvider {
    constructor(serviceModel, filter) {
        this.serviceModel = serviceModel;
        this.filter = filter;
    }
    ;
    async createServiceProvider(body, user) {
        body.admin = user._id;
        const service = await this.serviceModel.create(body);
        return { service };
    }
    ;
    async updateServiceProvider(serviceId, body, user) {
        const serviceExists = await this.serviceModel.findById(serviceId);
        if (!serviceExists) {
            throw new common_1.HttpException("service not found", 400);
        }
        ;
        if (serviceExists.admin.toString() != user._id.toString()) {
            throw new common_1.HttpException("you are not allowed to update service", 400);
        }
        ;
        const service = await this.serviceModel.findByIdAndUpdate(serviceId, body, { new: true });
        return { service };
    }
    ;
    async deleteServiceProvider(serviceId, user) {
        const serviceExists = await this.serviceModel.findById(serviceId);
        if (!serviceExists) {
            throw new common_1.HttpException("service not found", 400);
        }
        ;
        if (serviceExists.admin.toString() != user._id.toString()) {
            throw new common_1.HttpException("you are not allowed to delete service", 400);
        }
        ;
        await serviceExists.deleteOne();
        return { status: "deleted" };
    }
    ;
    async getServiceProvider(serviceId) {
        const serviceExists = await this.serviceModel.findById(serviceId).populate("admin");
        if (!serviceExists) {
            throw new common_1.HttpException("service not found", 400);
        }
        ;
        return { service: serviceExists };
    }
    ;
    async getAllServicesProviders(query) {
        const { paginationObj, query: data } = await this.filter
            .filter(this.serviceModel.find(), query).select()
            .sort().search().population("admin").pagination();
        let services = await data;
        return { services, paginationObj };
    }
    ;
};
exports.ServiceProvider = ServiceProvider;
exports.ServiceProvider = ServiceProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.Models.Service)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        api_service_1.apiFeatures])
], ServiceProvider);
;
//# sourceMappingURL=userServices.service.js.map