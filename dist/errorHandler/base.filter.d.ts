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
import { ArgumentsHost, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { Error } from "mongoose";
interface MongoError {
    driver?: boolean;
    code?: number;
    name?: string;
    statusCode?: number;
    status?: string;
    errmsg: string;
    index?: string;
}
interface ServerError {
    message?: string;
    code?: number;
}
export declare class catchExceptionsFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
    handleDuplicationError(exception: MongoError, object: ServerError): void;
    handleMongoValidatioError(exception: Error.ValidationError, object: ServerError): void;
    handleCastError(exception: Error.CastError, object: ServerError): void;
    handleNestError(exception: {
        message: string[];
        statusCode: number;
    }, object: ServerError): void;
    handleHttpException(exception: HttpException, object: ServerError): void;
    internalError(object: ServerError): void;
}
export {};
