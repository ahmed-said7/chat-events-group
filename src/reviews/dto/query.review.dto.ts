import { IsMongoId, IsOptional } from "class-validator";
import { mongodbId } from "src/group/group.service";

export class QueryReviewDto {
    
    @IsOptional()
    rating?: string | object;
    
    @IsOptional()
    @IsMongoId()
    user?: mongodbId;
    
    @IsOptional()
    @IsMongoId()
    review?: mongodbId;
    
    @IsOptional()
    page?:string;
    
    @IsOptional()
    sort?:string;
    
    @IsOptional()
    select?:string;
    
    @IsOptional()
    limit?:string;

};