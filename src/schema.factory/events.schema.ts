import { ConfigService } from "@nestjs/config";
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
        address:String,
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
        likes:[{
            type:Schema.Types.ObjectId,
            ref:Models.User
        }],
        comments:[{ 
            user : { type:Schema.Types.ObjectId , ref:Models.User },
            content : { type : String }
        }],
        price:{
            type:Number,
            default:0
        },
        image:String,
        admin : {
            type:Schema.Types.ObjectId,
            ref:Models.User
        }
    },{
        timestamps:true
    });
    constructor(){
        this.schema.index({location:"2dsphere"});
        this.schema.index({name:"text","details":"text"});
        this.schema.post("init",function(){
            if(this.image){
                this.image=`${process.env.url}/event/${this.image}`;
            }
        });
        this.schema.post("save",function(){
            if(this.image){
                this.image=`${process.env.url}/event/${this.image}`;
            }
        });
    };
};

export interface EventDoc extends Document {
    name:string;
    details:string;
    location:[number,number];
    startedAt:Date;
    endedAt:Date;
    interested:mongodbId[];
    went:mongodbId[];
    likes:mongodbId[];
    comments:{ _id?: mongodbId; user:mongodbId; content:string; }[];
    image:string;
    address:string;
    admin : mongodbId;
    price:number;
};