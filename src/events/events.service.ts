import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Models } from "src/enums/models";
import { EventDoc } from "src/schema.factory/events.schema";
import { UserDoc } from "src/schema.factory/user.schema";
import { CreateEventDto } from "./dto/event.create.dto";
import { UpdateEventDto } from "./dto/update.event.dto";
import { mongodbId } from "src/group/group.service";




@Injectable()
export class EventService {
    constructor(
        @InjectModel(Models.Event) private eventModel:Model<EventDoc>,
        @InjectModel(Models.User) private userModel:Model<UserDoc>
    ){};
    async createEvent( body:CreateEventDto , user:UserDoc ){
        body.admin=user._id;
        const event=await this.eventModel.create( body );
        return { event };
    };
    async updateEvent( eventId:mongodbId ,body:UpdateEventDto , user:UserDoc ){
        const eventExists =await this.eventModel.findById( eventId );
        if( ! eventExists ){
            throw new HttpException("event not found",400);
        };
        if( eventExists.admin.toString() != user._id.toString()  ){
            throw new HttpException("you are not allowed to update event",400);
        };
        await eventExists.updateOne({ $set : body });
        return { status:"updated" };
    };
    async deleteEvent( eventId:mongodbId , user:UserDoc ){
        const eventExists =await this.eventModel.findById( eventId );
        if( ! eventExists ){
            throw new HttpException("event not found",400);
        };
        if( eventExists.admin.toString() != user._id.toString()  ){
            throw new HttpException("you are not allowed to delete event",400);
        };
        await eventExists.deleteOne();
        return { status:"deleted" };
    };
    async getEvent( eventId:mongodbId  ){
        const eventExists =await this.eventModel.findById( eventId );
        if( ! eventExists ){
            throw new HttpException("event not found",400);
        };
        return { event:eventExists };
    };
    getAllEvents(){};
    addInterestUserToEvent(){};
    removeInterestUserFromEvent(){};
    addWentUserToEvent(){};
    removeWentUserFromEvent(){};
    getEventsByRadius(){};
    getUserInterestedEvents(){};
    getUserWentEvents(){};
};