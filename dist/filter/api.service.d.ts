/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Query } from "mongoose";
export interface g {
    page?: string;
    sort?: string;
    select?: string;
    limit?: string;
    keyword?: string;
}
export interface Pagination {
    currentPage?: number;
    previousPage?: number;
    nextPage?: number;
    numOfPages?: number;
    skip?: number;
    limit?: number;
}
export declare class apiFeatures<T, m extends g> {
    paginationObj: Pagination;
    query: Query<T[], T>;
    queryObj: m;
    filter(query: Query<T[], T>, queryObj: m): this;
    sort(): this;
    select(): this;
    search(): this;
    population(field: string | string[]): this;
    pagination(): Promise<this>;
}
