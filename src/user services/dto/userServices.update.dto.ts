import { Transform } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { mongodbId } from "src/group/group.service";

export class UpdateServiceProviderDto {
    @IsOptional()
    @IsString()
    name:string;
    @IsOptional()
    @IsString()
    details:string;
    @IsOptional()
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsNumber({},{each:true})
    location:[number,number];
    @IsOptional()
    @IsNumber()
    price:number;
    @IsOptional()
    @IsString()
    image:string;
    @IsOptional()
    @IsString()
    address:string;
};