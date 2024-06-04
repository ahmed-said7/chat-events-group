import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Models } from "src/enums/models";
import { ApiModule } from "src/filter/api.module";
import { SchemaFactoryModule } from "src/schema.factory/schema.module";
import { UserSchema } from "src/schema.factory/user.schema";
import { PaytabService } from "./paytab.service";
import { PaytabController } from "./paytab.controller";
import { Paytab } from "./paytab";
import { TicketSchema } from "src/schema.factory/ticket.schema";
import { EventSchema } from "src/schema.factory/events.schema";


@Module({
    imports:
    [
        ApiModule,SchemaFactoryModule,
        MongooseModule.forFeatureAsync([
            {
                imports:[SchemaFactoryModule],
                inject:[UserSchema],
                name:Models.User,
                useFactory:function(userSchema:UserSchema){
                    return userSchema.schema;
                }
            },
            {
                imports:[SchemaFactoryModule],
                inject:[EventSchema],
                name:Models.Event,
                useFactory:function(eventSchema:EventSchema){
                    return eventSchema.schema;
                }
            },
            {
                imports:[SchemaFactoryModule],
                inject:[TicketSchema],
                name:Models.Ticket,
                useFactory:function(ticketSchema:TicketSchema){
                    return ticketSchema.schema;
                }
            }
        ])
    ],
    controllers : [PaytabController],
    providers : [Paytab,PaytabService]
})
export class PaytabModule {};