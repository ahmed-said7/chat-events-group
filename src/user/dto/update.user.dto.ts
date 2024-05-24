import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { userType } from "src/enums/user.type";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(4)
    name: string;
    @IsOptional()
    @IsEnum(userType)
    role:string;
    @IsOptional()
    @IsEmail({},{message:"provide valid email address"})
    email: string;
};

export class forgetPassowrdBody {
    @IsNotEmpty()
    @IsEmail({},{message:"provide valid email address"})
    email: string;
};