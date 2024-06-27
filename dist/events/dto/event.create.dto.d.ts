import { mongodbId } from "src/group/group.service";
export declare class CreateEventDto {
    name: string;
    details: string;
    location: [number, number];
    startedAt: Date;
    endedAt: Date;
    images: string;
    address: string;
    admin: mongodbId;
    price: number;
}
