import { mongodbId } from "src/group/group.service";
export declare class CreateMessageDto {
    content: string;
    image: string;
    chat: mongodbId;
    user: mongodbId;
}
