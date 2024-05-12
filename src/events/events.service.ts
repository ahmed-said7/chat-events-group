import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Models } from "src/enums/models";
import { EventDoc } from "src/schema.factory/events.schema";
import { UserDoc } from "src/schema.factory/user.schema";
import { CreateEventDto } from "./dto/event.create.dto";
import { UpdateEventDto } from "./dto/update.event.dto";
import { mongodbId } from "src/group/group.service";
import { apiFeatures } from "src/filter/api.service";
import { QueryEventDto } from "./dto/event.query.dto";


@Injectable()
export class EventService {
    constructor(
        @InjectModel(Models.Event) private eventModel:Model<EventDoc>,
        @InjectModel(Models.User) private userModel:Model<UserDoc>,
        private filter:apiFeatures<EventDoc,QueryEventDto>
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
    async getAllEvents(query:QueryEventDto){
        const {paginationObj,query:data}=await this.filter
            .filter(this.eventModel.find(),query).select()
            .sort().search().pagination();
        let events=await data;
        return { events , paginationObj };
    };
    async addInterestUserToEvent(eventId:mongodbId,user:UserDoc){
        const eventExists =await this.eventModel.findById( eventId );
        if( ! eventExists ){
            throw new HttpException("event not found",400);
        };
        if( Date.now() > (eventExists.endedAt).getTime() ){
            throw new HttpException("event was ended at"+ eventExists.endedAt,400);
        };
        if( eventExists.interested.includes(user._id) ){
            throw new HttpException("you have been added to the interested list before",400);
        };
        eventExists.interested.push(user._id);
        await eventExists.save();
        return { status:"user added" , event:eventExists };
    };
    async removeInterestUserFromEvent(eventId:mongodbId,user:UserDoc){
        const eventExists =await this.eventModel.findById( eventId );
        if( ! eventExists ){
            throw new HttpException("event not found",400);
        };
        if( !eventExists.interested.includes(user._id) ){
            throw new HttpException("you have not been added to the interested list before",400);
        };
        eventExists.interested=eventExists.interested.filter( (id) => id.toString() != user._id.toString() );
        await eventExists.save();
        return { status:"user removed" , event:eventExists };
    };
    async addWentUserToEvent(eventId:mongodbId,user:UserDoc){
        const eventExists =await this.eventModel.findById( eventId );
        if( ! eventExists ){
            throw new HttpException("event not found",400);
        };
        if( Date.now() < (eventExists.endedAt).getTime() ){
            throw new HttpException("event is still running",400);
        };
        if( eventExists.went.includes(user._id) ){
            throw new HttpException("you have been added to the went list before",400);
        };
        eventExists.went.push(user._id);
        await eventExists.save();
        return { status:"user added" , event:eventExists };
    };
    async removeWentUserFromEvent( eventId:mongodbId,user:UserDoc ){
        const eventExists =await this.eventModel.findById( eventId );
        if( ! eventExists ){
            throw new HttpException("event not found",400);
        };
        if( !eventExists.went.includes(user._id) ){
            throw new HttpException("you have not been added to the went list before",400);
        };
        eventExists.went.push(user._id);
        await eventExists.save();
        return { status:"user removed" , event:eventExists };
    };
    async getEventsByRadius(location:string,distance:number){
        const [ lat , lng] = location.split(',');
        if( !lat || !lng ){
            return new HttpException("please provide a lat and lng",400);
        };
        const radius= ( distance || 10 ) / 6371;
        const events=await this.eventModel.
            find({ location : { $geoWithin : { $centerSphere : [ [lng,lat] , radius ]  } } });
        return { events };
    };
    async getUserInterestedEvents(eventId:mongodbId){
        const eventExists =await this.eventModel.findById( eventId ).populate("interested");
        if( ! eventExists ){
            throw new HttpException("event not found",400);
        };
        return { interested : eventExists.interested };
    };
    async getUserWentEvents(eventId:mongodbId){
        const eventExists =await this.eventModel.findById( eventId ).populate("went");
        if( ! eventExists ){
            throw new HttpException("event not found",400);
        };
        return { went : eventExists.went };
    };
};