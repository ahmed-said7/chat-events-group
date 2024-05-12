import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { userType } from "src/enums/user.type";

export class SignupUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    name: string;
    @IsOptional()
    @IsEnum(userType)
    role:string;
    @IsNotEmpty()
    @IsEmail({},{message:"provide valid email address"})
    email: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    passwordConfirm: string;
};