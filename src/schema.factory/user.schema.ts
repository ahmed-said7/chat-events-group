import { Schema,Document } from "mongoose";
import * as bcryptjs from "bcryptjs";


export class UserSchema {
    schema=new Schema({
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
        passwordChangedAt:Date
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
    passwordChangedAt:Date;
};