import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Models } from "src/enums/models";
import { SchemaFactoryModule } from "src/schema.factory/schema.module";
import { UserSchema } from "src/schema.factory/user.schema";
import { ApiModule } from "src/filter/api.module";
import { TicketService } from "./ticket.service";
import { TicketController } from "./ticket.controller";
import { TicketSchema } from "src/schema.factory/ticket.schema";


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
                name:Models.Ticket,
                imports:[SchemaFactoryModule],
                inject:[TicketSchema],
                useFactory:(ticketSchema:TicketSchema) => {
                    return ticketSchema.schema;
                }
            }
        ])
    ],
    providers:[TicketService],
    controllers:[TicketController]
})
export class TicketModule {};