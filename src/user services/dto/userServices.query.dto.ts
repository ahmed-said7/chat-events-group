import { IsOptional } from "class-validator";

export class QueryServiceProviderDto {
    @IsOptional()
    name:string|object;
    @IsOptional()
    details:string|object;
    @IsOptional()
    price:number|object;
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