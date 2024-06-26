import { mongodbId } from "src/group/group.service";
export declare class CreateServicProviderDto {
    name: string;
    details: string;
    location: [number, number];
    image: string;
    address: string;
    admin: mongodbId;
    price: string;
}
