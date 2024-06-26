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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../enums/models");
let QuestionService = class QuestionService {
    constructor(questionModel, contactModel) {
        this.questionModel = questionModel;
        this.contactModel = contactModel;
    }
    ;
    async createQuestion(body, user) {
        if (user.role != "admin") {
            throw new common_1.HttpException("route allowed only to admins", 400);
        }
        ;
        const question = await this.questionModel.create(body);
        return { question };
    }
    ;
    async deleteQuestion(id, user) {
        if (user.role != "admin") {
            throw new common_1.HttpException("route allowed only to admins", 400);
        }
        ;
        const question = await this.questionModel.findByIdAndDelete(id);
        if (!question) {
            throw new common_1.HttpException("question not found", 400);
        }
        ;
        return { status: "deleted" };
    }
    ;
    async getAllQuestions() {
        const questions = await this.questionModel.find().sort("-createdAt");
        return { questions };
    }
    ;
    async updateQuestion(body, questionId, user) {
        if (user.role != "admin") {
            throw new common_1.HttpException("route allowed only to admins", 400);
        }
        ;
        const question = await this.questionModel
            .findByIdAndUpdate(questionId, body, { new: true });
        if (!question) {
            throw new common_1.HttpException("question not found", 400);
        }
        ;
        return { question };
    }
    async addContact(body) {
        const contact = await this.contactModel.create(body);
        return { status: "contact sent" };
    }
    ;
    async getAllContacts() {
        const contacts = await this.contactModel.find().sort("-createdAt");
        return { contacts };
    }
    ;
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.Models.Question)),
    __param(1, (0, mongoose_1.InjectModel)(models_1.Models.Contact)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], QuestionService);
;
//# sourceMappingURL=question.service.js.map