import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Models } from "src/enums/models";
import { SchemaFactoryModule } from "src/schema.factory/schema.module";
import { UserSchema } from "src/schema.factory/user.schema";
import { ApiModule } from "src/filter/api.module";
import { ServiceProviderSchema } from "src/schema.factory/user.service.schema";
import { ServiceProvider } from "./userServices.service";
import { ServiceProviderController } from "./userServices.controller";


@Module({
    imports:[
        ApiModule,
        MongooseModule.forFeatureAsync([
            { 
                name:Models.User,
                imports:[SchemaFactoryModule],
                inject:[UserSchema],
                useFactory:(UserSchema:UserSchema) => {
                    return UserSchema.schema;
                }
            },
            { 
                name:Models.Service,
                imports:[SchemaFactoryModule],
                inject:[ServiceProviderSchema],
                useFactory:(srvSchema:ServiceProviderSchema) => {
                    return srvSchema.schema;
                }
            }
        ])
    ],
    providers:[{provide:"folder",useValue:"service"},ServiceProvider],
    controllers:[ServiceProviderController]
})
export class ServiceProviderModule {};