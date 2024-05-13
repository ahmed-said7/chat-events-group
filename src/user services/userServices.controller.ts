import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { Protected } from "src/guards/protect.user";
import { AuthUser } from "src/decorator/current.user";
import { UserDoc } from "src/schema.factory/user.schema";
import { ParseMongoId } from "src/pipes/validate.mogoid";
import { mongodbId } from "src/group/group.service";
import { FileInterceptorImage } from "src/interceptor/file.interceptor";
import { FileInterceptor } from "@nestjs/platform-express";
import { ServiceProvider } from "./userServices.service";
import { CreateServicProviderDto } from "./dto/userServices.create.dto";
import { QueryServiceProviderDto } from "./dto/userServices.query.dto";
import { UpdateServiceProviderDto } from "./dto/userServices.update.dto";



@Controller("service")
export class ServiceProviderController {
    constructor(
        private srvProvider: ServiceProvider
    ){};
    @Post()
    @UseGuards(Protected)
    @UseInterceptors(FileInterceptor("image"),FileInterceptorImage)
    createService(
        @Body() body:CreateServicProviderDto ,
        @AuthUser() user:UserDoc
    ){
        return this.srvProvider.createServiceProvider(body, user);
    };
    @Get(":srvId")
    getService(
        @Param("srvId",ParseMongoId) srvId: mongodbId
    ){
        return this.srvProvider.getServiceProvider(srvId);
    };
    @Get()
    @UseGuards(Protected)
    getAllServices(
        @Query() query:QueryServiceProviderDto
    ){
        return this.srvProvider.getAllServicesProviders( query );
    };
    @Patch(":srvId")
    @UseGuards(Protected)
    @UseInterceptors(FileInterceptor("image"),FileInterceptorImage)
    updateService(
        @Param("srvId",ParseMongoId) srvId: mongodbId,
        @Body() body:UpdateServiceProviderDto ,
        @AuthUser() user:UserDoc
    ){
        return this.srvProvider.updateServiceProvider(srvId,body,user);
    };
    @Delete(":srvId")
    @UseGuards(Protected)
    deleteService(
        @Param("srvId",ParseMongoId) srvId: mongodbId,
        @AuthUser() user:UserDoc
    ){
        return this.srvProvider.deleteServiceProvider(srvId,user);
    };
};