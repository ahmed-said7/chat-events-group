import { IsOptional } from "class-validator";

export class QueryEventDto {
    @IsOptional()
    name:string|object;
    @IsOptional()
    details:string|object;
    @IsOptional()
    startedAt:Date|object;
    @IsOptional()
    endedAt:Date|object;
    @IsOptional()
    address:string|object;
    @IsOptional()
    page?:string;
    @IsOptional()
    sort?:string;
    @IsOptional()
    select?:string;
    @IsOptional()
    limit?:string;
    @IsOptional()
    keyword?:string;
};