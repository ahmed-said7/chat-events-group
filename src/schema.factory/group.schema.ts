import { Schema , Document } from "mongoose";
import { Models } from "src/enums/models";
import { mongodbId } from "src/group/group.service";


export class GroupSchema {
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
        users: [{
                type:Schema.Types.ObjectId,
                ref:Models.User
        }],
        requests: [{
            type:Schema.Types.ObjectId,
            ref:Models.User
        }]
    },{
        timestamps:true
    });
    constructor(){
        this.schema.index({ name:"text" });
    };
};

export interface GroupDoc extends Document {
    name: string;
    image:string,
    admin : mongodbId ,
    users: mongodbId [],
    requests: mongodbId []
};
