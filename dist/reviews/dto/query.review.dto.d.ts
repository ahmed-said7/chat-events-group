import { mongodbId } from "src/group/group.service";
export declare class QueryReviewDto {
    rating?: string | object;
    user?: mongodbId;
    review?: mongodbId;
    page?: string;
    sort?: string;
    select?: string;
    limit?: string;
}
