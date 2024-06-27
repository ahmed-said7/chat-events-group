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
    @Transform( ( {value} )=> {
        if( typeof value === "string" ){
            return JSON.parse( value );
        };
        return value;
    } )
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
    @IsArray()
    @IsString({each:true})
    images:string;
    @IsNotEmpty()
    @IsString()
    address:string;
    @IsOptional()
    @IsMongoId()
    admin : mongodbId;
    @IsOptional()
    @IsNumber()
    price:number;
};