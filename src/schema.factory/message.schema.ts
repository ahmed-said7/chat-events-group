import { ConfigService } from "@nestjs/config";
import {Schema,Document} from "mongoose";
import { Models } from "src/enums/models";


export class MessageSchema {
    schema=new Schema({
        content:{
            type:String,
            trim:true
        },
        image:String,
        chat : {
            type:Schema.Types.ObjectId,
            ref:Models.Chat
        },
        user: {
                type:Schema.Types.ObjectId,
                ref:Models.User
        }
    },{
        timestamps:true
    });
    constructor(config:ConfigService){
        this.schema.post("init",function(){
            if(this.image){
                this.image=`${config.get("url")}/message/${this.image}`;
            }
        });
        this.schema.post("save",function(){
            if(this.image){
                this.image=`${config.get("url")}/message/${this.image}`;
            }
        });
    };
};

export interface MessageDoc extends Document {
    content: string;
    image:string,
    chat : Schema.Types.ObjectId ,
    user: Schema.Types.ObjectId 
};