import { ConfigService } from "@nestjs/config";
import {Schema,Document,model, Model} from "mongoose";
import { Models } from "src/enums/models";
import { mongodbId } from "src/group/group.service";


export class ServiceProviderSchema {
    schema=new Schema({
        name:{
            type:String,
            required:true,
            trim:true
        },
        details:String,
        location:[Number],
        address:String,
        price:Number,
        image:String,
        admin : {
            type:Schema.Types.ObjectId,
            ref:Models.User
        }
    },{
        timestamps:true
    });
    constructor(){
        this.schema.index({name:"text",details:"text"});
        this.schema.post("init",function(){
            if(this.image){
                this.image=`${process.env.url}/service/${this.image}`;
            }
        });
        this.schema.post("save",function(){
            if(this.image){
                this.image=`${process.env.url}/service/${this.image}`;
            }
        });
    };
};

export interface ServiceProviderDoc extends Document {
    name:string;
    details:string;
    image:string;
    address:string;
    admin : mongodbId;
    price:number;
    location:[number,number];
};