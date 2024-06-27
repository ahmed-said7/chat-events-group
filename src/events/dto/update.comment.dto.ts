import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { mongodbId } from "src/group/group.service";

export class UpdateCommentDto {
    @IsNotEmpty()
    @IsString()
    content: string;
};