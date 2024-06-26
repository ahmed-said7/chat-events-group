import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Models } from "src/enums/models";
import { SchemaFactoryModule } from "src/schema.factory/schema.module";
import { UserSchema } from "src/schema.factory/user.schema";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { mailerModule } from "src/nodemailer/nodemailer.module";

@Module({
    imports:[
        mailerModule,
        MongooseModule.forFeatureAsync([
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
    providers:[
        UserService
        ,{provide:"folder",useValue:"user"}
    ],
    controllers:[UserController]
})
export class UserModule {};