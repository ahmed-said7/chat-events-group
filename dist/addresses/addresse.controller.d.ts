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
import { CreateAddresseDto } from "./dto/addresse.create.dto";
import { UpdateAddresseDto } from "./dto/addresse.update.dto";
import { AddresseService } from "./addresse.service";
import { mongodbId } from "src/group/group.service";
export declare class AddresseController {
    private addresseService;
    constructor(addresseService: AddresseService);
    addAddresse(body: CreateAddresseDto, user: UserDoc): Promise<{
        addresses: {
            _id: import("mongoose").Schema.Types.ObjectId;
            postalCode: number;
            details: string;
            city: string;
            street: string;
            mobile: string;
        }[];
    }>;
    updateAddresse(body: UpdateAddresseDto, user: UserDoc, addresseId: mongodbId): Promise<{
        addresses: {
            _id: import("mongoose").Schema.Types.ObjectId;
            postalCode: number;
            details: string;
            city: string;
            street: string;
            mobile: string;
        }[];
    }>;
    deleteAddresse(user: UserDoc, addresseId: mongodbId): Promise<{
        addresses: {
            _id: import("mongoose").Schema.Types.ObjectId;
            postalCode: number;
            details: string;
            city: string;
            street: string;
            mobile: string;
        }[];
    }>;
}
