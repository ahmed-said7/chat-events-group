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
exports.AddresseController = void 0;
const common_1 = require("@nestjs/common");
const protect_user_1 = require("../guards/protect.user");
const current_user_1 = require("../decorator/current.user");
const addresse_create_dto_1 = require("./dto/addresse.create.dto");
const addresse_update_dto_1 = require("./dto/addresse.update.dto");
const addresse_service_1 = require("./addresse.service");
const validate_mogoid_1 = require("../pipes/validate.mogoid");
let AddresseController = class AddresseController {
    constructor(addresseService) {
        this.addresseService = addresseService;
    }
    ;
    addAddresse(body, user) {
        return this.addresseService.addAddresse(body, user);
    }
    ;
    updateAddresse(body, user, addresseId) {
        return this.addresseService.updateAddresse(body, addresseId, user);
    }
    ;
    deleteAddresse(user, addresseId) {
        return this.addresseService.deleteAddresse(addresseId, user);
    }
    ;
};
exports.AddresseController = AddresseController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addresse_create_dto_1.CreateAddresseDto, Object]),
    __metadata("design:returntype", void 0)
], AddresseController.prototype, "addAddresse", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_1.AuthUser)()),
    __param(2, (0, common_1.Param)("id", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addresse_update_dto_1.UpdateAddresseDto, Object, Object]),
    __metadata("design:returntype", void 0)
], AddresseController.prototype, "updateAddresse", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, current_user_1.AuthUser)()),
    __param(1, (0, common_1.Param)("id", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AddresseController.prototype, "deleteAddresse", null);
exports.AddresseController = AddresseController = __decorate([
    (0, common_1.Controller)("addresse"),
    __metadata("design:paramtypes", [addresse_service_1.AddresseService])
], AddresseController);
//# sourceMappingURL=addresse.controller.js.map