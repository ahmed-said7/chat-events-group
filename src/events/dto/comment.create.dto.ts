import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { mongodbId } from "src/group/group.service";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    content: string;
    @IsOptional()
    @IsMongoId()
    user : mongodbId;
};