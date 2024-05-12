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
    constructor(){
        // this.schema.post("init",function(){
        // })
    };
};

export interface MessageDoc extends Document {
    content: string;
    image:string,
    chat : Schema.Types.ObjectId ,
    user: Schema.Types.ObjectId 
};