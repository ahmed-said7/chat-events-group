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
import { Model } from "mongoose";
import { EventDoc } from "src/schema.factory/events.schema";
import { UserDoc } from "src/schema.factory/user.schema";
import { mongodbId } from "src/group/group.service";
import { apiFeatures } from "src/filter/api.service";
import { ServiceProviderDoc } from "src/schema.factory/user.service.schema";
import { QueryServiceProviderDto } from "./dto/userServices.query.dto";
import { CreateServicProviderDto } from "./dto/userServices.create.dto";
import { UpdateServiceProviderDto } from "./dto/userServices.update.dto";
export declare class ServiceProvider {
    private serviceModel;
    private filter;
    constructor(serviceModel: Model<ServiceProviderDoc>, filter: apiFeatures<EventDoc, QueryServiceProviderDto>);
    createServiceProvider(body: CreateServicProviderDto, user: UserDoc): Promise<{
        service: import("mongoose").Document<unknown, {}, ServiceProviderDoc> & ServiceProviderDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    updateServiceProvider(serviceId: mongodbId, body: UpdateServiceProviderDto, user: UserDoc): Promise<{
        service: import("mongoose").Document<unknown, {}, ServiceProviderDoc> & ServiceProviderDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deleteServiceProvider(serviceId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
    getServiceProvider(serviceId: mongodbId): Promise<{
        service: import("mongoose").Document<unknown, {}, ServiceProviderDoc> & ServiceProviderDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getAllServicesProviders(query: QueryServiceProviderDto): Promise<{
        services: EventDoc[];
        paginationObj: import("src/filter/api.service").Pagination;
    }>;
}
