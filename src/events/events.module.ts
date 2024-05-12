import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Models } from "src/enums/models";
import { EventSchema } from "src/schema.factory/events.schema";
import { SchemaFactoryModule } from "src/schema.factory/schema.module";
import { UserSchema } from "src/schema.factory/user.schema";
import { EventController } from "./events.controller";
import { EventService } from "./events.service";
import { ApiModule } from "src/filter/api.module";


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
                name:Models.Event,
                imports:[SchemaFactoryModule],
                inject:[EventSchema],
                useFactory:(eventSchema:EventSchema) => {
                    return eventSchema.schema;
                }
            }
        ])
    ],
    providers:[EventService,{provide:"folder",useValue:"event"}],
    controllers:[EventController]
})
export class EventModule {};