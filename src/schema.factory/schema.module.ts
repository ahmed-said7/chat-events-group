import { Module } from "@nestjs/common";
import { UserSchema } from "./user.schema";
import { ChatSchema } from "./chat.schema";
import { GroupSchema } from "./group.schema";
import { PostSchema } from "./post.schema";
import { MessageSchema } from "./message.schema";
import { EventSchema } from "./events.schema";

@Module({
    providers:[UserSchema,ChatSchema,GroupSchema,PostSchema,MessageSchema,EventSchema],
    exports:[UserSchema,ChatSchema,GroupSchema,PostSchema,MessageSchema,EventSchema]
})

export class SchemaFactoryModule {};