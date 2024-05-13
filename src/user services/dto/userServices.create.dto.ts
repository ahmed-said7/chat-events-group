import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsArray, IsDate, IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, MinDate, isDate, isDateString } from "class-validator";
import { mongodbId } from "src/group/group.service";

export class CreateServicProviderDto {
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsString()
    details:string;
    @IsOptional()
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsNumber({},{each:true})
    location:[number,number];
    @IsOptional()
    @IsString()
    image:string;
    @IsNotEmpty()
    @IsString()
    address:string;
    @IsOptional()
    @IsMongoId()
    admin : mongodbId;
    @IsNotEmpty()
    @IsNumber()
    price:string;
};