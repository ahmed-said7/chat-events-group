import { ConfigService } from "@nestjs/config";
import { Schema , Document } from "mongoose";
import { Models } from "src/enums/models";
import { mongodbId } from "src/group/group.service";

export class PostSchema {
    schema=new Schema({
        content:{
            type:String,
            required:true,
            trim:true
        },
        image:String,
        user : {
            type:Schema.Types.ObjectId,
            ref:Models.User
        },
        group : {
            type:Schema.Types.ObjectId,
            ref:Models.Group
        },
        likes : [{
            type:Schema.Types.ObjectId,
            ref:Models.User
        }],
        comments : [{
            user : { type:Schema.Types.ObjectId,ref:Models.User } ,
            content : { required: true , type:String  }
        }]
    },{
        timestamps:true
    });
    constructor(){
        const self=this;
        this.schema.post("init",function(){
            if(this.image){
                this.image=`${process.env.url}/post/${this.image}`;
            }
        });
        this.schema.post("save",function(){
            if(this.image){
                this.image=`${process.env.url}/post/${this.image}`;
            }
        });
    };
};

export interface PostDoc extends Document {
    content: string;
    image : string;
    user : mongodbId;
    group : mongodbId;
    likes: mongodbId[];
    comments: { user:mongodbId; content:string; _id?:mongodbId } [];
};