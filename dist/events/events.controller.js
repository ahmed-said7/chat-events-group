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
exports.EventController = void 0;
const common_1 = require("@nestjs/common");
const events_service_1 = require("./events.service");
const protect_user_1 = require("../guards/protect.user");
const event_create_dto_1 = require("./dto/event.create.dto");
const current_user_1 = require("../decorator/current.user");
const validate_mogoid_1 = require("../pipes/validate.mogoid");
const event_query_dto_1 = require("./dto/event.query.dto");
const update_event_dto_1 = require("./dto/update.event.dto");
const file_interceptor_1 = require("../interceptor/file.interceptor");
const platform_express_1 = require("@nestjs/platform-express");
const comment_create_dto_1 = require("./dto/comment.create.dto");
const update_comment_dto_1 = require("./dto/update.comment.dto");
let EventController = class EventController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    ;
    addUserInterestToEvent(eventId, user) {
        return this.eventService.addInterestUserToEvent(eventId, user);
    }
    ;
    deleteUserInterestFromEvent(eventId, user) {
        return this.eventService.removeInterestUserFromEvent(eventId, user);
    }
    ;
    getUserInterestedForEvent(eventId) {
        return this.eventService.getUserInterestedEvents(eventId);
    }
    ;
    addUserToEventWentList(eventId, user) {
        return this.eventService.addWentUserToEvent(eventId, user);
    }
    ;
    deleteUserFromEventWentList(eventId, user) {
        return this.eventService.removeWentUserFromEvent(eventId, user);
    }
    ;
    getEventWentList(eventId) {
        return this.eventService.getUserWentEvents(eventId);
    }
    ;
    getEventByDistance(location, distance) {
        return this.eventService.getEventsByRadius(location, distance);
    }
    ;
    createEvent(body, user) {
        return this.eventService.createEvent(body, user);
    }
    ;
    getEvent(eventId) {
        return this.eventService.getEvent(eventId);
    }
    ;
    getAllEvents(query) {
        return this.eventService.getAllEvents(query);
    }
    ;
    updateEvent(eventId, body, user) {
        return this.eventService.updateEvent(eventId, body, user);
    }
    ;
    deleteEvent(eventId, user) {
        return this.eventService.deleteEvent(eventId, user);
    }
    ;
    createEventComment(eventId, body, user) {
        return this.eventService.addComment(body, eventId, user);
    }
    ;
    deleteEventComment(eventId, commentId, user) {
        return this.eventService.removeComment(eventId, commentId, user);
    }
    ;
    updateEventComment(eventId, commentId, body, user) {
        return this.eventService.updateComment(body, eventId, commentId, user);
    }
    ;
    getEventComments(eventId, user) {
        return this.eventService.getComments(eventId);
    }
    ;
    addEventLike(eventId, user) {
        return this.eventService.addLikeToEvent(eventId, user);
    }
    ;
    removeEventLike(eventId, user) {
        return this.eventService.removeLikeFromEvent(eventId, user);
    }
    ;
    getEventLikes(eventId, user) {
        return this.eventService.getEventLikes(eventId);
    }
    ;
    addSavedEvent(eventId, user) {
        return this.eventService.addEventToSave(eventId, user);
    }
    ;
    removeSavedEvent(eventId, user) {
        return this.eventService.removeEventFromSave(eventId, user);
    }
    ;
    getSavedEvents(user) {
        return this.eventService.getSavedEvents(user);
    }
    ;
};
exports.EventController = EventController;
__decorate([
    (0, common_1.Post)("interest/:eventId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "addUserInterestToEvent", null);
__decorate([
    (0, common_1.Delete)("interest/:eventId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "deleteUserInterestFromEvent", null);
__decorate([
    (0, common_1.Get)("interest/:eventId"),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getUserInterestedForEvent", null);
__decorate([
    (0, common_1.Post)("attended/:eventId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "addUserToEventWentList", null);
__decorate([
    (0, common_1.Delete)("attended/:eventId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "deleteUserFromEventWentList", null);
__decorate([
    (0, common_1.Get)("attended/:eventId"),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getEventWentList", null);
__decorate([
    (0, common_1.Get)("location/:location/distance/:distance"),
    __param(0, (0, common_1.Param)("location")),
    __param(1, (0, common_1.Param)("distance", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getEventByDistance", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.FileInterceptorImage),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_create_dto_1.CreateEventDto, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Get)(":eventId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getEvent", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_query_dto_1.QueryEventDto]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getAllEvents", null);
__decorate([
    (0, common_1.Patch)(":eventId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image"), file_interceptor_1.FileInterceptorImage),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_event_dto_1.UpdateEventDto, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "updateEvent", null);
__decorate([
    (0, common_1.Delete)(":eventId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "deleteEvent", null);
__decorate([
    (0, common_1.Post)(":eventId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, comment_create_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "createEventComment", null);
__decorate([
    (0, common_1.Delete)(":eventId/comment/:commentId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, common_1.Param)("commentId", validate_mogoid_1.ParseMongoId)),
    __param(2, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "deleteEventComment", null);
__decorate([
    (0, common_1.Patch)(":eventId/comment/:commentId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, common_1.Param)("commentId", validate_mogoid_1.ParseMongoId)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, update_comment_dto_1.UpdateCommentDto, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "updateEventComment", null);
__decorate([
    (0, common_1.Patch)("comments/:eventId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getEventComments", null);
__decorate([
    (0, common_1.Post)("likes/:eventId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "addEventLike", null);
__decorate([
    (0, common_1.Delete)("likes/:eventId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "removeEventLike", null);
__decorate([
    (0, common_1.Get)("likes/:eventId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getEventLikes", null);
__decorate([
    (0, common_1.Post)("saved/:eventId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "addSavedEvent", null);
__decorate([
    (0, common_1.Delete)("saved/:eventId"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, common_1.Param)("eventId", validate_mogoid_1.ParseMongoId)),
    __param(1, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "removeSavedEvent", null);
__decorate([
    (0, common_1.Get)("saved"),
    (0, common_1.UseGuards)(protect_user_1.Protected),
    __param(0, (0, current_user_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], EventController.prototype, "getSavedEvents", null);
exports.EventController = EventController = __decorate([
    (0, common_1.Controller)("event"),
    __metadata("design:paramtypes", [events_service_1.EventService])
], EventController);
;
//# sourceMappingURL=events.controller.js.map