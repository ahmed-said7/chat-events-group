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
exports.AddresseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../enums/models");
let AddresseService = class AddresseService {
    constructor(Usermodel) {
        this.Usermodel = Usermodel;
    }
    ;
    async addAddresse(body, user) {
        const result = await this.Usermodel.
            findByIdAndUpdate(user._id, { $addToSet: { addresses: body } }, { new: true });
        return { addresses: result.addresses };
    }
    ;
    async updateAddresse(body, addresseId, user) {
        const index = user.addresses.findIndex((field) => field._id.toString() === addresseId.toString());
        if (index == -1) {
            throw new common_1.HttpException("addresse not found", 400);
        }
        ;
        user.addresses[index] = { ...user.addresses[index], ...body, _id: user.addresses[index]._id };
        await user.save();
        return { addresses: user.addresses };
    }
    ;
    async deleteAddresse(addresseId, user) {
        const index = user.addresses.findIndex((field) => field._id.toString() === addresseId.toString());
        if (index == -1) {
            throw new common_1.HttpException("addresse not found", 400);
        }
        ;
        user.addresses.splice(index, 1);
        await user.save();
        return { addresses: user.addresses };
    }
    ;
};
exports.AddresseService = AddresseService;
exports.AddresseService = AddresseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.Models.User)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AddresseService);
//# sourceMappingURL=addresse.service.js.map