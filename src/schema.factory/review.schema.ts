import {Schema,Document, Model} from "mongoose";
import { Models } from "src/enums/models";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Injectable } from "@nestjs/common";
import { mongodbId } from "src/group/group.service";

@Injectable()
export class ReviewSchema {
    schema=new Schema({
        rating:Number,
        user : {
            type:Schema.Types.ObjectId,
            ref:Models.User
        },
        review: {
                type:Schema.Types.ObjectId,
                ref:Models.Review
        },
        
    },{
        timestamps:true
    });
    constructor( private events:EventEmitter2 ){
        const self=this;
        this.schema.post("deleteOne",{document:true,query:false},function(){
            self.events.emit("review.deleteOne",this);
        });
        this.schema.post("save",function(){
            self.events.emit("review.save",this);
        });
    };
};

export interface ReviewDoc extends Document {
    rating: number;
    review: mongodbId;
    user: mongodbId;
};