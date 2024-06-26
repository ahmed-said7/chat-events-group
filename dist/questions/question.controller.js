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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const protect_user_1 = require("../guards/protect.user");
const current_user_1 = require("../decorator/current.user");
const validate_mogoid_1 = require("../pipes/validate.mogoid");
const question_service_1 = require("./question.service");
const create_contact_dto_1 = require("./dto/create.contact.dto");
const create_question_dto_1 = require("./dto/create.question.dto");
const update_question_dto_1 = require("./dto/update.question.dto");
let QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    ;
    createContact(body) {
        return this.questionService.addContact(body);
    }
    ;
    getAllContact() {
        return this.questionService.getAllContacts();
    }
    ;
    createQuestion(body, user) {
        return this.questionService.createQuestion(body, user);
    }
    ;
    getAllQuestions() {
        return this.questionService.getAllQuestions();
    }
    ;
    deleteQuestion(questionId, user) {
        return this.questionService.deleteQuestion(questionId, user);
    }
    ;
    updateQuestion(questionId, user, body) {
        return this.questionService.updateQuestion(body, questionId, user);
    }
    ;
};
exports.QuestionController = QuestionController;
__decorate([
    (0, common_1.Post)("contact"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_dto_1.CreateContactDto]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "createContact", null);
__decorate([
    (0, common_1.Get)("contact"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "getAllContact", null);
__decorate([
    (0, common_1.Post)("question"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_question_dto_1.CreateQuestionDto, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "createQuestion", null);
__decorate([
    (0, common_1.Get)("question"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "getAllQuestions", null);
__decorate([
    (0, common_1.Delete)("question/:questionId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("questionId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "deleteQuestion", null);
__decorate([
    (0, common_1.Patch)("question/:questionId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("questionId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_question_dto_1.UpdateQuestionDto]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "updateQuestion", null);
exports.QuestionController = QuestionController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
//# sourceMappingURL=question.controller.js.map