import { mongodbId } from "src/group/group.service";
export declare class CreateCommentDto {
    content: string;
    user: mongodbId;
}
