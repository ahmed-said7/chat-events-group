import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMessageDto {
    @IsOptional()
    @IsString()
    email:string;
    @IsOptional()
    @IsString()
    phone:string;
    @IsNotEmpty()
    @IsString()
    message:string;
};