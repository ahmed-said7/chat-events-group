import { Transform } from "class-transformer";
import { ArrayMaxSize, ArrayMinSize, ArrayNotEmpty, IsArray, IsDate, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { mongodbId } from "src/group/group.service";

export class UpdateEventDto {
    @IsOptional()
    @IsString()
    name:string;
    @IsOptional()
    @IsString()
    details:string;
    @IsOptional()
    @Transform( ( {value} )=> {
        if( typeof value === "string" ){
            return JSON.parse( value );
        };
        return value;
    })
    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @IsNumber({},{each:true})
    location:[number,number];
    @IsOptional()
    @Transform( ( {value} )=> new Date(value) )
    @IsDate()
    startedAt:Date;
    @IsOptional()
    @Transform( ( {value} )=> new Date(value) )
    @IsDate()
    endedAt:Date;
    @IsOptional()
    @IsArray()
    @IsString({each:true})
    images:string;
    @IsOptional()
    @IsString()
    address:string;
};