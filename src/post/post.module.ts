import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Models } from "src/enums/models";
import { GroupSchema } from "src/schema.factory/group.schema";
import { PostSchema } from "src/schema.factory/post.schema";
import { SchemaFactoryModule } from "src/schema.factory/schema.module";
import { UserSchema } from "src/schema.factory/user.schema";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";


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
            }
        ])
    ],
    providers:[PostService],
    controllers:[PostController]
})
export class PostModule {};