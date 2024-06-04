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

interface CreateComment {
    content:string;
    user?:mongodbId;
};

interface UpdateComment {
    content?:string;
};

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
        const event=await this.eventModel.findByIdAndUpdate(eventId,body,{ new:true });
        return { event };
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
        const eventExists =await this.eventModel
            .findById( eventId ).populate("admin");
        if( ! eventExists ){
            throw new HttpException("event not found",400);
        };
        return { event:eventExists };
    };
    async getAllEvents(query:QueryEventDto){
        const {paginationObj,query:data}=await this.filter
            .filter(this.eventModel.find(),query).select()
            .sort().population("admin")
            .search().pagination();
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
        return { status:"user added to interested list" };
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
        return { status:"user removed from interested list" };
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
        return { status:"user added to attended list" };
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
        return { status:"user removed from interested list"};
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
        return { attended : eventExists.went };
    };
    async addEventToSave(eventId:mongodbId,user:UserDoc){
        const eventExists =await this.eventModel.findById( eventId );
        if( ! eventExists ){
            throw new HttpException("event not found",400);
        };
        if( user.savedEvents.includes(eventId) ){
            throw new HttpException("event already added to saved list",400);
        };
        user.savedEvents.push(eventId);
        await user.save();
        return { status : "event added to saved list" };
    };
    async removeEventFromSave(eventId:mongodbId,user:UserDoc){
        const eventExists =await this.eventModel.findById( eventId );
        if( ! eventExists ){
            throw new HttpException("event not found",400);
        };
        if( !user.savedEvents.includes(eventId) ){
            throw new HttpException("event is not added to saved list",400);
        };
        user.savedEvents=user.savedEvents
            .filter ( id => id.toString() != eventId.toString()  )
        await user.save();
        return { status : "event removed from saved list" };
    };
    async addLikeToEvent(eventId:mongodbId,user:UserDoc){
        const eventExists =await this.eventModel.findById( eventId );
        if( ! eventExists ){
            throw new HttpException("event not found",400);
        };
        if( eventExists.likes.includes(user._id) ){
            throw new HttpException("user already added like",400);
        };
        await this.eventModel.
            findByIdAndUpdate(eventId,{ $addToSet : { likes : user._id } });
        return { status : "like added to event" };
    };
    async removeLikeFromEvent(eventId:mongodbId,user:UserDoc){
        const eventExists =await this.eventModel.findById( eventId );
        if( ! eventExists ){
            throw new HttpException("event not found",400);
        };
        if( !eventExists.likes.includes(user._id) ){
            throw new HttpException("event is not liked by user",400);
        };
        eventExists.likes=eventExists.likes
            .filter ( id => id.toString() != user._id.toString()  )
        await eventExists.save();
        return { status : "like removed from event" };
    };
    async getSavedEvents( user:UserDoc ){
        const saved=await user.populate("savedEvents");
        return { events : saved.savedEvents };
    };
    async getEventLikes(eventId:mongodbId){
        const eventExists =await this.eventModel.
            findById( eventId ).populate("likes");
        if( ! eventExists ){
            throw new HttpException("event not found",400);
        };
        return { likes : eventExists.likes };
    };
    async addComment(body:CreateComment,eventId:mongodbId,user:UserDoc){
        const event=await this.eventModel.findOne({ 
            _id : eventId
        });
        if( !event ){
            throw new HttpException("event not found" , 400 );
        };
        event.comments.push({ content : body.content , user:user._id  });
        await event.save();
        return { status:"comment added",comment:event.comments[event.comments.length-1]  }
    };
    async removeComment(eventId:mongodbId,commentId:mongodbId,user:UserDoc){
        const event=await this.eventModel.findOne({ 
            _id : eventId
        });
        if( !event ){
            throw new HttpException("event not found" , 400 );
        };
        const index=event.comments
            .findIndex( ( { _id } ) => _id.toString() == commentId.toString()  );
        if( index == -1 ){
            throw new HttpException("No comment found",400);
        };
        if(  
            event.comments[index].user.toString() == user._id.toString()
        ){
            event.comments.splice(index,1);
            await event.save();
            return { status:"deleted" }
        }else {
            throw new HttpException("you are not allowed to delete a comment",400);
        };
    };
    async updateComment(body:UpdateComment,eventId:mongodbId,commentId:mongodbId,user:UserDoc){
        const event=await this.eventModel.findOne({ 
            _id : eventId
        });
        if( !event ){
            throw new HttpException("event not found" , 400 );
        };
        const index=event.comments
            .findIndex( ( { _id } ) => _id.toString() == commentId.toString()  );
        if( index == -1 ){
            throw new HttpException("No comment found",400);
        };
        if( 
            event.comments[index].user.toString() == user._id.toString()
        ){
            event.comments[index].content=body.content;
            await event.save();
            return { status:"updated" , comment:event.comments[index] }
        }else {
            throw new HttpException("you are not allowed to update a comment",400);
        };
    };
    async getComments(eventId:mongodbId , user:UserDoc){
        const event=await this.eventModel.findOne({
            _id : eventId
        }).populate("comments.user");
        if( !event ){
            throw new HttpException("event not found" , 400 );
        };
        return { comments : event.comments };
    };
};