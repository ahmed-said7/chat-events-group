import { IsOptional } from "class-validator";
import { mongodbId } from "src/group/group.service";

export class QueryTicketDto {
    @IsOptional()
    owner:mongodbId;
    @IsOptional()
    user:mongodbId;
    @IsOptional()
    event:mongodbId;
    @IsOptional()
    paidAt:Date;
    @IsOptional()
    isPaid:boolean;
    @IsOptional()
    price:number;
    @IsOptional()
    page:string;
    @IsOptional()
    sort:string;
    @IsOptional()
    select:string;
    @IsOptional()
    limit:string;
};