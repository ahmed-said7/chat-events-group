import { Schema,Document, model } from "mongoose";
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
        averageRating: { type: Number, default:0 } ,
        ratingQuantity: { type: Number, default:0 } ,
        images:[String],
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
            if(this.images.length > 0){
                const images=[];
                this.images.forEach((img)=>{
                    images.push(`${process.env.url}/event/${img}`);
                });
                this.images=images;
            }
        });
        this.schema.post("save",function(){
            if(this.images.length > 0){
                const images=[];
                this.images.forEach((img)=>{
                    images.push(`${process.env.url}/event/${img}`);
                });
                this.images=images;
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
    images:string[];
    address:string;
    admin : mongodbId;
    price:number;
};