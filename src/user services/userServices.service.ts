import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Models } from "src/enums/models";
import { EventDoc } from "src/schema.factory/events.schema";
import { UserDoc } from "src/schema.factory/user.schema";
import { mongodbId } from "src/group/group.service";
import { apiFeatures } from "src/filter/api.service";
import { ServiceProviderDoc } from "src/schema.factory/user.service.schema";
import { QueryServiceProviderDto } from "./dto/userServices.query.dto";
import { CreateServicProviderDto } from "./dto/userServices.create.dto";
import { UpdateServiceProviderDto } from "./dto/userServices.update.dto";

@Injectable()
export class ServiceProvider {
    constructor(
        @InjectModel(Models.Service) private serviceModel:Model<ServiceProviderDoc>,
        private filter:apiFeatures<EventDoc,QueryServiceProviderDto>
    ){};
    async createServiceProvider( body:CreateServicProviderDto , user:UserDoc ){
        body.admin=user._id;
        const service=await this.serviceModel.create( body );
        return { service };
    };
    async updateServiceProvider( serviceId:mongodbId ,body:UpdateServiceProviderDto , user:UserDoc ){
        const serviceExists =await this.serviceModel.findById( serviceId );
        if( ! serviceExists ){
            throw new HttpException("service not found",400);
        };
        if( serviceExists.admin.toString() != user._id.toString()  ){
            throw new HttpException("you are not allowed to update service",400);
        };
        const service=await this.serviceModel.findByIdAndUpdate(serviceId,body,{ new:true });
        return { service };
    };
    async deleteServiceProvider( serviceId:mongodbId , user:UserDoc ){
        const serviceExists =await this.serviceModel.findById( serviceId );
        if( ! serviceExists ){
            throw new HttpException("service not found",400);
        };
        if( serviceExists.admin.toString() != user._id.toString()  ){
            throw new HttpException("you are not allowed to delete service",400);
        };
        await serviceExists.deleteOne();
        return { status:"deleted" };
    };
    async getServiceProvider( serviceId:mongodbId  ){
        const serviceExists =await this.serviceModel.findById( serviceId ).populate("admin");
        if( ! serviceExists ){
            throw new HttpException("service not found",400);
        };
        return { service:serviceExists };
    };
    async getAllServicesProviders(query:QueryServiceProviderDto){
        const {paginationObj,query:data}=await this.filter
            .filter(this.serviceModel.find(),query).select()
            .sort().search().population("admin").pagination();
        let services=await data;
        return { services , paginationObj };
    };
};