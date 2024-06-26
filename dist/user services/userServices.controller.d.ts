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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UserDoc } from "src/schema.factory/user.schema";
import { mongodbId } from "src/group/group.service";
import { ServiceProvider } from "./userServices.service";
import { CreateServicProviderDto } from "./dto/userServices.create.dto";
import { QueryServiceProviderDto } from "./dto/userServices.query.dto";
import { UpdateServiceProviderDto } from "./dto/userServices.update.dto";
export declare class ServiceProviderController {
    private srvProvider;
    constructor(srvProvider: ServiceProvider);
    createService(body: CreateServicProviderDto, user: UserDoc): Promise<{
        service: import("mongoose").Document<unknown, {}, import("../schema.factory/user.service.schema").ServiceProviderDoc> & import("../schema.factory/user.service.schema").ServiceProviderDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getService(srvId: mongodbId): Promise<{
        service: import("mongoose").Document<unknown, {}, import("../schema.factory/user.service.schema").ServiceProviderDoc> & import("../schema.factory/user.service.schema").ServiceProviderDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    getAllServices(query: QueryServiceProviderDto): Promise<{
        services: import("../schema.factory/events.schema").EventDoc[];
        paginationObj: import("../filter/api.service").Pagination;
    }>;
    updateService(srvId: mongodbId, body: UpdateServiceProviderDto, user: UserDoc): Promise<{
        service: import("mongoose").Document<unknown, {}, import("../schema.factory/user.service.schema").ServiceProviderDoc> & import("../schema.factory/user.service.schema").ServiceProviderDoc & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    deleteService(srvId: mongodbId, user: UserDoc): Promise<{
        status: string;
    }>;
}
