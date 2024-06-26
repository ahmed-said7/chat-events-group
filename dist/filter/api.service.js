"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiFeatures = void 0;
const common_1 = require("@nestjs/common");
;
;
let apiFeatures = class apiFeatures {
    constructor() {
        this.paginationObj = {};
    }
    filter(query, queryObj) {
        this.query = query;
        this.queryObj = queryObj;
        let filter = { ...this.queryObj };
        let fields = ['keyword', 'page', 'limit', 'select', 'sort'];
        fields.forEach((field) => { delete filter[field]; });
        let queryStr = JSON.stringify(filter);
        queryStr = queryStr.replace(/lt|gt|lte|gte/g, val => `$${val}`);
        filter = JSON.parse(queryStr);
        this.query = this.query.find({ ...filter });
        return this;
    }
    ;
    sort() {
        if (this.queryObj.sort) {
            const sort = this.queryObj.sort.split(',').join(' ');
            this.query = this.query.sort(sort);
        }
        else {
            this.query = this.query.sort("-createdAt");
        }
        ;
        return this;
    }
    ;
    select() {
        if (this.queryObj.select) {
            const select = this.queryObj.select.split(',').join(' ');
            this.query = this.query.select(select);
        }
        ;
        return this;
    }
    ;
    search() {
        if (this.queryObj.keyword) {
            const keyword = this.queryObj.keyword;
            this.query = this.query.find({ $text: { $search: keyword } });
        }
        ;
        return this;
    }
    ;
    population(field) {
        if (field) {
            this.query = this.query.populate(field);
        }
        ;
        return this;
    }
    ;
    async pagination() {
        this.paginationObj.numOfPages = (await (this.query.model.find({ ...this.query.getQuery() }))).length;
        this.paginationObj.currentPage = this.queryObj.page ? parseInt(this.queryObj.page) : 1;
        this.paginationObj.limit = this.queryObj.limit ? parseInt(this.queryObj.limit) : 10;
        this.paginationObj.skip = (this.paginationObj.currentPage - 1) * this.paginationObj.limit;
        if (this.paginationObj.currentPage > 1) {
            this.paginationObj.previousPage = this.paginationObj.currentPage - 1;
        }
        ;
        if (this.paginationObj.numOfPages > this.paginationObj.currentPage * this.paginationObj.limit) {
            this.paginationObj.nextPage = this.paginationObj.currentPage + 1;
        }
        ;
        this.query = this.query.skip(this.paginationObj.skip).limit(this.paginationObj.limit);
        return this;
    }
    ;
};
exports.apiFeatures = apiFeatures;
exports.apiFeatures = apiFeatures = __decorate([
    (0, common_1.Injectable)()
], apiFeatures);
;
//# sourceMappingURL=api.service.js.map