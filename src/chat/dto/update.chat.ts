import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { mongodbId } from "src/group/group.service";

export class UpdateChatDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    image: string;
};