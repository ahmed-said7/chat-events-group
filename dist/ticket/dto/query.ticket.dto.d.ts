import { mongodbId } from "src/group/group.service";
export declare class QueryTicketDto {
    owner: mongodbId;
    user: mongodbId;
    event: mongodbId;
    paidAt: Date;
    isPaid: boolean;
    price: number;
    page: string;
    sort: string;
    select: string;
    limit: string;
}
