import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Models } from "src/enums/models";
import { GroupSchema } from "src/schema.factory/group.schema";
import { PostSchema } from "src/schema.factory/post.schema";
import { SchemaFactoryModule } from "src/schema.factory/schema.module";
import { UserSchema } from "src/schema.factory/user.schema";
import { ServiceProviderSchema } from "src/schema.factory/user.service.schema";
import { EventSchema } from "src/schema.factory/events.schema";
import { FeedService } from "./feed.service";
import { FeedController } from "./feed.controller";


@Module({
    imports:[
        MongooseModule.forFeatureAsync([
            {
                name:Models.Post,
                useFactory:function(postSchema:PostSchema) {
                    return postSchema.schema;
                },
                inject:[PostSchema]
                ,imports:[SchemaFactoryModule]
            },
            { 
                name:Models.User,
                imports:[SchemaFactoryModule],
                inject:[UserSchema],
                useFactory:(UserSchema:UserSchema) => {
                    return UserSchema.schema;
                }
            },
            { 
                name:Models.Group,
                imports:[SchemaFactoryModule],
                inject:[GroupSchema],
                useFactory:(groupSchema:GroupSchema) => {
                    return groupSchema.schema;
                }
            },
            { 
                name:Models.Service,
                imports:[SchemaFactoryModule],
                inject:[ServiceProviderSchema],
                useFactory:(srvSchema:ServiceProviderSchema) => {
                    return srvSchema.schema;
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
    providers:[FeedService],
    controllers:[FeedController]
})
export class FeedModule {};