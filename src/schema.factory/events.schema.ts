import {Schema,Document,model, Model} from "mongoose";
import { Models } from "src/enums/models";
import { mongodbId } from "src/group/group.service";


export class EventSchema {
    schema=new Schema({
        name:{
            type:String,
            required:true,
            trim:true
        },
        details:String,
        location:[Number],
        startedAt:Date,
        endedAt:Date,
        interested:[{
            type:Schema.Types.ObjectId,
            ref:Models.User
        }],
        went:[{
            type:Schema.Types.ObjectId,
            ref:Models.User
        }],
        image:String,
        going:[{
            type:Schema.Types.ObjectId,
            ref:Models.User
        }],
        admin : {
            type:Schema.Types.ObjectId,
            ref:Models.User
        }
    },{
        timestamps:true
    });
    constructor(){};
};

export interface EventDoc extends Document {
    name:string,
    details:string,
    location:[number,number],
    startedAt:Date,
    endedAt:Date,
    interested:mongodbId[],
    went:mongodbId[],
    image:string,
    going:mongodbId[],
    admin : mongodbId;
};