import mongoose, { Schema,Document, Types } from "mongoose";
import * as bcryptjs from "bcryptjs";
import { Models } from "src/enums/models";
import { mongodbId } from "src/group/group.service";


export class UserSchema {
    schema=new Schema({
        addresses:[{
            code:Number,
            country:String,
            city:String,
            quarter:String
        }],
        name:{
            type:String,
            required:true,
            trim:true,
            minlength:4
        },
        image:String,
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:true
            ,minlength:6
        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user"
        },
        savedEvents:[{type:Types.ObjectId,ref:Models.Event}],
        followers:[{type:Types.ObjectId,ref:Models.User}],
        passwordChangedAt:Date,
        passwordResetCode:String,
        passwordResetCodeExpires:Date,
        passwordResetCodeVertified:Boolean,
        lastSeen:Date,
        emailVertified:{type:Boolean,default:false},
        active:{type:Boolean,default:true},
        emailVerifiedExpired:Date,
        emailVerifiedCode:String,
        averageRating: { type:Number,default:0 },
        ratingQuantity:{ type:Number,default:0 }
        },{
            timestamps:true
        }
    );
    constructor(){
        this.schema.pre("save",async function(next){
            if(this.isModified("password")){
                this.password=await bcryptjs.hash(this.password,10);
            };
            return next();
        });
        this.schema.index({ name:"text" });
        this.schema.post("init",function(){
            if(this.image){
                this.image=`${process.env.url}/user/${this.image}`;
            }
        });
        this.schema.post("save",function(){
            if(this.image){
                this.image=`${process.env.url}/user/${this.image}`;
            }
        });
    };
};

export interface UserDoc extends Document {
    name:string;
    email:string;
    image:string;
    password:string;
    role:string;
    lastSeen:Date;
    emailVertified?:boolean;
    emailVerifiedExpired?:Date;
    emailVerifiedCode?:string;
    passwordChangedAt?:Date;
    passwordResetCode?:string;
    passwordResetCodeExpires?:Date;
    passwordResetCodeVertified?:boolean;
    followers:mongodbId[];
    savedEvents:mongodbId[];
    averageRating: number,
    ratingQuantity: number,
    addresses:{
        _id:mongodbId;
        postalCode:number;
        details:string;
        city:string;
        street:string;
        mobile:string;
    }[];
};