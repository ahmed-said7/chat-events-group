import { ConfigService } from "@nestjs/config";
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
    constructor(private config:ConfigService){
        this.schema.index({ name:"text" });
        this.schema.post("init",function(){
            if(this.image){
                this.image=`${config.get("url")}/chat/${this.image}`;
            }
        });
        this.schema.post("save",function(){
            if(this.image){
                this.image=`${config.get("url")}/chat/${this.image}`;
            }
        });
        // this.schema.post("deleteOne",{document:true,query:false},function(){
        //     console.log(this._id);
        // });
    };
};

export interface ChatDoc extends Document {
    name: string;
    image:string,
    admin : mongodbId,
    user: mongodbId,
    lastMessage: mongodbId
};