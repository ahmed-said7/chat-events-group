"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
;
;
let catchExceptionsFilter = class catchExceptionsFilter extends core_1.BaseExceptionFilter {
    catch(exception, host) {
        const object = {};
        object.code = 400;
        const res = host.switchToHttp().getResponse();
        if (exception?.response?.message && Array.isArray(exception.response.message)) {
            this.handleNestError(exception.response, object);
        }
        else if (exception instanceof common_1.HttpException) {
            this.handleHttpException(exception, object);
        }
        else if (exception.name === "ValidationError") {
            this.handleMongoValidatioError(exception, object);
        }
        else if (exception.name === "CastError") {
            this.handleCastError(exception, object);
        }
        else if (exception.code === 11000) {
            this.handleDuplicationError(exception, object);
        }
        else {
            console.log(exception);
            this.internalError(object);
        }
        ;
        res.status(object.code).json(object);
    }
    ;
    handleDuplicationError(exception, object) {
        const val = exception.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
        object.message = ` duplicate value of ${val} `;
    }
    ;
    handleMongoValidatioError(exception, object) {
        object.message = Object
            .values(exception.errors)
            .map((Err) => Err.message).join(' and ');
    }
    ;
    handleCastError(exception, object) {
        object.message = `invalid mongoId value ${exception.value}`;
    }
    ;
    handleNestError(exception, object) {
        object.message = exception.message.join(' and ');
        object.code = exception.statusCode;
    }
    ;
    handleHttpException(exception, object) {
        object.message = exception.message;
        object.code = exception.getStatus();
    }
    ;
    internalError(object) {
        object.message = `internal server error`;
        object.code = 500;
    }
    ;
};
exports.catchExceptionsFilter = catchExceptionsFilter;
exports.catchExceptionsFilter = catchExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], catchExceptionsFilter);
;
//# sourceMappingURL=base.filter.js.map