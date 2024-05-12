import {Schema,Document,model, Model} from "mongoose";
import { Models } from "src/enums/models";
import { mongodbId } from "src/group/group.service";


export class ChatSchema {
    schema=new Schema({
        name:{
            type:String,
            required:true,
            trim:true
        },
        image:String,
        admin : {
            type:Schema.Types.ObjectId,
            ref:Models.User
        },
        lastMessage : {
            type:Schema.Types.ObjectId,
            ref:Models.Message
        },
        user: {
                type:Schema.Types.ObjectId,
                ref:Models.User
        }
    },{
        timestamps:true
    });
    constructor(){
        this.schema.index({ name:"text" });
        // this.schema.post("init",function(){
        // })
    };
};

export interface ChatDoc extends Document {
    name: string;
    image:string,
    admin : mongodbId,
    user: mongodbId,
    lastMessage: mongodbId
};