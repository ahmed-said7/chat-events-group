import { Module } from "@nestjs/common";
import { UserSchema } from "./user.schema";
import { ChatSchema } from "./chat.schema";
import { GroupSchema } from "./group.schema";
import { PostSchema } from "./post.schema";
import { MessageSchema } from "./message.schema";

@Module({
    providers:[UserSchema,ChatSchema,GroupSchema,PostSchema,MessageSchema],
    exports:[UserSchema,ChatSchema,GroupSchema,PostSchema,MessageSchema]
})

export class SchemaFactoryModule {};