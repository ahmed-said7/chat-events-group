import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Models } from "src/enums/models";
import { GroupSchema } from "src/schema.factory/group.schema";
import { SchemaFactoryModule } from "src/schema.factory/schema.module";
import { UserSchema } from "src/schema.factory/user.schema";
import { GroupServices } from "./group.service";
import { GroupController } from "./group.controller";

@Module({
    imports:[
        MongooseModule.forFeatureAsync([
            {
                name:Models.Group,
                useFactory:function(groupSchema:GroupSchema) {
                    return groupSchema.schema;
                },
                inject:[GroupSchema]
                ,imports:[SchemaFactoryModule]
            },
            { 
                name:Models.User,
                imports:[SchemaFactoryModule],
                inject:[UserSchema],
                useFactory:(UserSchema:UserSchema) => {
                    return UserSchema.schema;
                }
            }
        ])
    ],
    providers:[GroupServices],
    controllers:[GroupController]
})
export class GroupModule {};