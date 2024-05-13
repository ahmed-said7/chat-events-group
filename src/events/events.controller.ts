import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { EventService } from "./events.service";
import { Protected } from "src/guards/protect.user";
import { CreateEventDto } from "./dto/event.create.dto";
import { AuthUser } from "src/decorator/current.user";
import { UserDoc } from "src/schema.factory/user.schema";
import { ParseMongoId } from "src/pipes/validate.mogoid";
import { mongodbId } from "src/group/group.service";
import { QueryEventDto } from "./dto/event.query.dto";
import { UpdateEventDto } from "./dto/update.event.dto";
import { FileInterceptorImage } from "src/interceptor/file.interceptor";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller("event")
export class EventController {
    constructor(
        private eventService: EventService
    ){};
    
    @Post("interest/:eventId")
    @UseGuards(Protected)
    addUserInterestToEvent(
        @Param("eventId",ParseMongoId) eventId: mongodbId,
        @AuthUser() user:UserDoc
    ){
        return this.eventService.addInterestUserToEvent(eventId, user);
    };

    @Delete("interest/:eventId")
    @UseGuards(Protected)
    deleteUserInterestFromEvent(
        @Param("eventId",ParseMongoId) eventId: mongodbId,
        @AuthUser() user:UserDoc
    ){
        return this.eventService.removeInterestUserFromEvent(eventId, user);
    };

    @Get("interest/:eventId")
    getUserInterestedForEvent(
        @Param("eventId",ParseMongoId) eventId: mongodbId
    ){
        return this.eventService.getUserInterestedEvents(eventId);
    };


    @Post("attended/:eventId")
    @UseGuards(Protected)
    addUserToEventWentList(
        @Param("eventId",ParseMongoId) eventId: mongodbId,
        @AuthUser() user:UserDoc
    ){
        return this.eventService.addWentUserToEvent(eventId, user);
    };

    @Delete("attended/:eventId")
    @UseGuards(Protected)
    deleteUserFromEventWentList(
        @Param("eventId",ParseMongoId) eventId: mongodbId,
        @AuthUser() user:UserDoc
    ){
        return this.eventService.removeWentUserFromEvent(eventId, user);
    };

    @Get("attended/:eventId")
    getEventWentList(
        @Param("eventId",ParseMongoId) eventId: mongodbId
    ){
        return this.eventService.getUserWentEvents(eventId);
    };

    @Get("location/:location/distance/:distance")
    getEventByDistance(
        @Param("location") location: string,
        @Param("distance",ParseIntPipe) distance: number
    ){
        return this.eventService.getEventsByRadius(location,distance);
    };

    @Post()
    @UseGuards(Protected)
    @UseInterceptors(FileInterceptor("image"),FileInterceptorImage)
    createEvent(
        @Body() body:CreateEventDto ,
        @AuthUser() user:UserDoc
    ){
        return this.eventService.createEvent(body, user);
    };
    @Get(":eventId")
    @UseGuards(Protected)
    getEvent(
        @Param("eventId",ParseMongoId) eventId: mongodbId
    ){
        return this.eventService.getEvent(eventId);
    };
    @Get()
    @UseGuards(Protected)
    getAllEvents(
        @Query() query:QueryEventDto
    ){
        return this.eventService.getAllEvents( query );
    };
    @Patch(":eventId")
    @UseGuards(Protected)
    @UseInterceptors(FileInterceptor("image"),FileInterceptorImage)
    updateEvent(
        @Param("eventId",ParseMongoId) eventId: mongodbId,
        @Body() body:UpdateEventDto ,
        @AuthUser() user:UserDoc
    ){
        return this.eventService.updateEvent(eventId,body,user);
    };
    @Delete(":eventId")
    @UseGuards(Protected)
    deleteEvent(
        @Param("eventId",ParseMongoId) eventId: mongodbId,
        @AuthUser() user:UserDoc
    ){
        return this.eventService.deleteEvent(eventId,user);
    };
};