import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { Protected } from "src/guards/protect.user";
import { TicketService } from "./ticket.service";
import { QueryTicketDto } from "./dto/query.ticket.dto";
import { ParseMongoId } from "src/pipes/validate.mogoid";
import { mongodbId } from "src/group/group.service";
import { AuthUser } from "src/decorator/current.user";
import { UserDoc } from "src/schema.factory/user.schema";


@Controller("ticket")
export class TicketController {
    constructor( private ticketService:TicketService ){};
    @UseGuards(Protected)
    @Get(":ticketId")
    getTicket( 
        @Param("ticketId",ParseMongoId) ticketId:mongodbId,
        @AuthUser() user:UserDoc
    ){
        return this.ticketService.getTicket(ticketId,user);
    };
    @UseGuards(Protected)
    @Get()
    getAllTickets( 
        @Query() query:QueryTicketDto ,
        @AuthUser() user:UserDoc
    ){
        return this.ticketService.getAllTickets(query,user);
    };
};