import { mongodbId } from "src/group/group.service";
export declare class CreateReviewDto {
    user: mongodbId;
    review: mongodbId;
    rating: number;
}
