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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const models_1 = require("../enums/models");
const api_service_1 = require("../filter/api.service");
;
;
let EventService = class EventService {
    constructor(eventModel, userModel, filter) {
        this.eventModel = eventModel;
        this.userModel = userModel;
        this.filter = filter;
    }
    ;
    async createEvent(body, user) {
        body.admin = user._id;
        const event = await this.eventModel.create(body);
        return { event };
    }
    ;
    async updateEvent(eventId, body, user) {
        const eventExists = await this.eventModel.findById(eventId);
        if (!eventExists) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        if (eventExists.admin.toString() != user._id.toString()) {
            throw new common_1.HttpException("you are not allowed to update event", 400);
        }
        ;
        const event = await this.eventModel.findByIdAndUpdate(eventId, body, { new: true });
        return { event };
    }
    ;
    async deleteEvent(eventId, user) {
        const eventExists = await this.eventModel.findById(eventId);
        if (!eventExists) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        if (eventExists.admin.toString() != user._id.toString()) {
            throw new common_1.HttpException("you are not allowed to delete event", 400);
        }
        ;
        await eventExists.deleteOne();
        return { status: "deleted" };
    }
    ;
    async getEvent(eventId) {
        const eventExists = await this.eventModel
            .findById(eventId).populate("admin");
        if (!eventExists) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        return { event: eventExists };
    }
    ;
    async getAllEvents(query) {
        const { paginationObj, query: data } = await this.filter
            .filter(this.eventModel.find(), query).select()
            .sort().population("admin")
            .search().pagination();
        let events = await data;
        return { events, paginationObj };
    }
    ;
    async addInterestUserToEvent(eventId, user) {
        const eventExists = await this.eventModel.findById(eventId);
        if (!eventExists) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        if (Date.now() > (eventExists.endedAt).getTime()) {
            throw new common_1.HttpException("event was ended at" + eventExists.endedAt, 400);
        }
        ;
        if (eventExists.interested.includes(user._id)) {
            throw new common_1.HttpException("you have been added to the interested list before", 400);
        }
        ;
        eventExists.interested.push(user._id);
        await eventExists.save();
        return { status: "user added to interested list" };
    }
    ;
    async removeInterestUserFromEvent(eventId, user) {
        const eventExists = await this.eventModel.findById(eventId);
        if (!eventExists) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        if (!eventExists.interested.includes(user._id)) {
            throw new common_1.HttpException("you have not been added to the interested list before", 400);
        }
        ;
        eventExists.interested = eventExists.interested.filter((id) => id.toString() != user._id.toString());
        await eventExists.save();
        return { status: "user removed from interested list" };
    }
    ;
    async addWentUserToEvent(eventId, user) {
        const eventExists = await this.eventModel.findById(eventId);
        if (!eventExists) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        if (Date.now() < (eventExists.endedAt).getTime()) {
            throw new common_1.HttpException("event is still running", 400);
        }
        ;
        if (eventExists.went.includes(user._id)) {
            throw new common_1.HttpException("you have been added to the went list before", 400);
        }
        ;
        eventExists.went.push(user._id);
        await eventExists.save();
        return { status: "user added to attended list" };
    }
    ;
    async removeWentUserFromEvent(eventId, user) {
        const eventExists = await this.eventModel.findById(eventId);
        if (!eventExists) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        if (!eventExists.went.includes(user._id)) {
            throw new common_1.HttpException("you have not been added to the went list before", 400);
        }
        ;
        eventExists.went.push(user._id);
        await eventExists.save();
        return { status: "user removed from interested list" };
    }
    ;
    async getEventsByRadius(location, distance) {
        const [lat, lng] = location.split(',');
        if (!lat || !lng) {
            return new common_1.HttpException("please provide a lat and lng", 400);
        }
        ;
        const radius = (distance || 10) / 6371;
        const events = await this.eventModel.
            find({ location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } } });
        return { events };
    }
    ;
    async getUserInterestedEvents(eventId) {
        const eventExists = await this.eventModel.findById(eventId).populate("interested");
        if (!eventExists) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        return { interested: eventExists.interested };
    }
    ;
    async getUserWentEvents(eventId) {
        const eventExists = await this.eventModel.findById(eventId).populate("went");
        if (!eventExists) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        return { attended: eventExists.went };
    }
    ;
    async addEventToSave(eventId, user) {
        const eventExists = await this.eventModel.findById(eventId);
        if (!eventExists) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        if (user.savedEvents.includes(eventId)) {
            throw new common_1.HttpException("event already added to saved list", 400);
        }
        ;
        user.savedEvents.push(eventId);
        await user.save();
        return { status: "event added to saved list" };
    }
    ;
    async removeEventFromSave(eventId, user) {
        const eventExists = await this.eventModel.findById(eventId);
        if (!eventExists) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        if (!user.savedEvents.includes(eventId)) {
            throw new common_1.HttpException("event is not added to saved list", 400);
        }
        ;
        user.savedEvents = user.savedEvents
            .filter(id => id.toString() != eventId.toString());
        await user.save();
        return { status: "event removed from saved list" };
    }
    ;
    async addLikeToEvent(eventId, user) {
        const eventExists = await this.eventModel.findById(eventId);
        if (!eventExists) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        if (eventExists.likes.includes(user._id)) {
            throw new common_1.HttpException("user already added like", 400);
        }
        ;
        await this.eventModel.
            findByIdAndUpdate(eventId, { $addToSet: { likes: user._id } });
        return { status: "like added to event" };
    }
    ;
    async removeLikeFromEvent(eventId, user) {
        const eventExists = await this.eventModel.findById(eventId);
        if (!eventExists) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        if (!eventExists.likes.includes(user._id)) {
            throw new common_1.HttpException("event is not liked by user", 400);
        }
        ;
        eventExists.likes = eventExists.likes
            .filter(id => id.toString() != user._id.toString());
        await eventExists.save();
        return { status: "like removed from event" };
    }
    ;
    async getSavedEvents(user) {
        const saved = await user.populate("savedEvents");
        return { events: saved.savedEvents };
    }
    ;
    async getEventLikes(eventId) {
        const eventExists = await this.eventModel.
            findById(eventId).populate("likes");
        if (!eventExists) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        return { likes: eventExists.likes };
    }
    ;
    async addComment(body, eventId, user) {
        const event = await this.eventModel.findOne({
            _id: eventId
        });
        if (!event) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        event.comments.push({ content: body.content, user: user._id });
        await event.save();
        return { status: "comment added", comment: event.comments[event.comments.length - 1] };
    }
    ;
    async removeComment(eventId, commentId, user) {
        const event = await this.eventModel.findOne({
            _id: eventId
        });
        if (!event) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        const index = event.comments
            .findIndex(({ _id }) => _id.toString() == commentId.toString());
        if (index == -1) {
            throw new common_1.HttpException("No comment found", 400);
        }
        ;
        if (event.comments[index].user.toString() == user._id.toString()) {
            event.comments.splice(index, 1);
            await event.save();
            return { status: "deleted" };
        }
        else {
            throw new common_1.HttpException("you are not allowed to delete a comment", 400);
        }
        ;
    }
    ;
    async updateComment(body, eventId, commentId, user) {
        const event = await this.eventModel.findOne({
            _id: eventId
        });
        if (!event) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        const index = event.comments
            .findIndex(({ _id }) => _id.toString() == commentId.toString());
        if (index == -1) {
            throw new common_1.HttpException("No comment found", 400);
        }
        ;
        if (event.comments[index].user.toString() == user._id.toString()) {
            event.comments[index].content = body.content;
            await event.save();
            return { status: "updated", comment: event.comments[index] };
        }
        else {
            throw new common_1.HttpException("you are not allowed to update a comment", 400);
        }
        ;
    }
    ;
    async getComments(eventId) {
        const event = await this.eventModel.findOne({
            _id: eventId
        }).populate("comments.user");
        if (!event) {
            throw new common_1.HttpException("event not found", 400);
        }
        ;
        return { comments: event.comments };
    }
    ;
};
exports.EventService = EventService;
exports.EventService = EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(models_1.Models.Event)),
    __param(1, (0, mongoose_1.InjectModel)(models_1.Models.User)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        api_service_1.apiFeatures])
], EventService);
;
//# sourceMappingURL=events.service.js.map