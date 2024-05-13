import { Module } from "@nestjs/common";
import { UserSchema } from "./user.schema";
import { ChatSchema } from "./chat.schema";
import { GroupSchema } from "./group.schema";
import { PostSchema } from "./post.schema";
import { MessageSchema } from "./message.schema";
import { EventSchema } from "./events.schema";
import { ConfigModule } from "@nestjs/config";
import { ServiceProviderSchema } from "./user.service.schema";


@Module({
    imports:[ConfigModule.forRoot()],
    providers:[UserSchema,ChatSchema,GroupSchema,PostSchema,MessageSchema,EventSchema,ServiceProviderSchema],
    exports:[UserSchema,ChatSchema,GroupSchema,PostSchema,MessageSchema,EventSchema,ServiceProviderSchema]
})

export class SchemaFactoryModule {};