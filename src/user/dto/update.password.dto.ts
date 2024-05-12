import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { userType } from "src/enums/user.type";

export class UpdatePasswordDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    passwordConfirm: string;
    @IsNotEmpty()
    @IsString()
    currentPassword: string;
};