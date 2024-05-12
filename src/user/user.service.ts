import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Models } from "src/enums/models";
import * as bcryptjs from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";
import { UserDoc } from "src/schema.factory/user.schema";
import { mongodbId } from "src/group/group.service";


interface SignUp {
    name: string;
    password: string;
    passwordConfirm:string;
    email: string;
    role?:string;
};

interface UpdateUser {
    name?: string;
    email?: string;
    role?:string;
};

interface LogIn {
    email: string;
    password: string;
};

interface ChangePassword {
    password: string;
    currentPassword: string;
    passwordConfirm: string;
};

@Injectable()
export class UserService {
    constructor
    (
        private config:ConfigService,
        @InjectModel(Models.User) private Usermodel: Model<UserDoc>
    ) {};
    async signup(body:SignUp){
        let user=await this.validateEmail(body.email);
        if( body.password !== body.passwordConfirm ){
            throw new HttpException("password does not match password confirm",400);
        };
        user = await this.Usermodel.create(body);
        const token=this.createtoken(user._id);
        return { token , user };
    };
    async login(body:LogIn){
        let user=await this.Usermodel.findOne({ email: body.email });
        if( ! user ){
            throw new HttpException("user not found",400);
        };
        const valid=await bcryptjs.compare(body.password,user.password);
        if( ! valid ){
            throw new HttpException("password or email is not correct",400);
        };
        const token=this.createtoken(user._id);
        return { token , user };
    };
    private createtoken(userId:string){
        const token=jwt.
            sign( {userId} , this.config.get<string>("secret") , {expiresIn:"12d"} );
        return "Bearer "+token;
    };
    async updatepassword(body:ChangePassword,user:UserDoc){
        const valid=await bcryptjs.compare(body.currentPassword,user.password);
        if( ! valid ){
            throw new HttpException("current password is not correct",400);
        };
        if( body.password !== body.passwordConfirm ){
            throw new HttpException("password does not match password confirm",400);
        };
        user.password=body.password;
        user.passwordChangedAt=new Date();
        await user.save();
        return { user , status :"password has been updated" }
    };
    async deleteUser(user:UserDoc){
        await user.deleteOne();
        return { status : " user deleted" };
    };
    async getUser(user:UserDoc){
        user.password=null;
        user.passwordChangedAt=null;
        return { user };
    };
    private async validateEmail(email:string){
        let user=await this.Usermodel.findOne({ email });
        if( user ){
            throw new HttpException("email already exists",400);
        };
        return user;
    };
    async updateUser(body:UpdateUser,user:UserDoc){
        if(body.email){
            await this.validateEmail(body.email);
        };
        const updated= await this.Usermodel.findByIdAndUpdate(user._id,body,{new:true});
        return { status:"updated",user:updated };
    };
    async getOneUser(userId:mongodbId){
        const user = await this.Usermodel.findOne({ _id:userId });
        if( !user ){
            throw new HttpException("User not found",400);
        };
        return { user };
    };
    async getUsersBySearchName(keyword?:string){
        const users=
        await this.Usermodel.find(
            {
            $text : { $search : keyword }
        }
        );
        return { users };
    };
};