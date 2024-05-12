import { Transform } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsArray, IsDate, IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, MinDate, isDate, isDateString } from "class-validator";
import { mongodbId } from "src/group/group.service";

export class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    name:string;
    @IsNotEmpty()
    @IsString()
    details:string;
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsNumber({},{each:true})
    location:[number,number];
    @IsNotEmpty()
    @Transform( ( {value} )=> new Date(value) )
    @IsDate()
    // @MinDate(new Date())
    startedAt:Date;
    @IsNotEmpty()
    @Transform( ( {value} )=> new Date(value) )
    @IsDate()
    endedAt:Date;
    @IsOptional()
    @IsString()
    image:string;
    @IsNotEmpty()
    @IsString()
    address:string;
    @IsOptional()
    @IsMongoId()
    admin : mongodbId;
};