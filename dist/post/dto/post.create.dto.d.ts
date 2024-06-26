import { mongodbId } from "src/group/group.service";
export declare class CreatePostDto {
    content: string;
    image: string;
    user: mongodbId;
    group: mongodbId;
}
