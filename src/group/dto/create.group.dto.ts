import { IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import {  Types } from "mongoose";
import { mongodbId } from "../group.service";

export class CreateGroupDto {
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsArray()
    @IsMongoId({each:true})
    users:mongodbId[];
    @IsOptional()
    @IsString()
    image:string;
};