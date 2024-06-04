import { ConfigService } from "@nestjs/config";
import {Schema,Document,model, Model} from "mongoose";
import { Models } from "src/enums/models";
import { mongodbId } from "src/group/group.service";


export class TicketSchema {
    schema=new Schema({
        paidAt:{
            type:Date
        },
        isPaid:{
            type:Boolean,
            default:false
        },
        price:{
            type:Number,
            default:0
        },
        user : {
            type:Schema.Types.ObjectId,
            ref:Models.User
        },
        event: {
            type:Schema.Types.ObjectId,
            ref:Models.Event
        },
        owner: {
                type:Schema.Types.ObjectId,
                ref:Models.User
        }
    },{
        timestamps:true
    });
};

export interface TicketDoc extends Document {
    event : mongodbId;
    user: mongodbId;
    owner: mongodbId;
    price:number;
    paidAt:Date;
    isPaid:boolean;
};