import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { mongodbId } from "src/group/group.service";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    content: string;
    @IsNotEmpty()
    @IsString()
    image : string;
    @IsOptional()
    @IsMongoId()
    user : mongodbId;
    @IsNotEmpty()
    @IsMongoId()
    group : mongodbId;
};