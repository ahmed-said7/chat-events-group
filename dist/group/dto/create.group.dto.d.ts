import { mongodbId } from "../group.service";
export declare class CreateGroupDto {
    name: string;
    users: mongodbId[];
    image: string;
}
