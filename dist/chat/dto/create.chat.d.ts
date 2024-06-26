import { mongodbId } from "src/group/group.service";
export declare class CreateChatDto {
    name: string;
    image: string;
    user: mongodbId;
    admin: mongodbId;
}
