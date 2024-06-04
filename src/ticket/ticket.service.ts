import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Models } from "src/enums/models";
import { UserDoc } from "src/schema.factory/user.schema";
import { mongodbId } from "src/group/group.service";
import { apiFeatures } from "src/filter/api.service";
import { TicketDoc } from "src/schema.factory/ticket.schema";
import { QueryTicketDto } from "./dto/query.ticket.dto";


@Injectable()
export class TicketService {
    constructor(
        @InjectModel(Models.Ticket) private ticketModel:Model<TicketDoc>,
        private filter:apiFeatures<TicketDoc,QueryTicketDto>
    ){};
    async getTicket( ticketId:mongodbId,user:UserDoc  ){
        const ticketExists =await this.ticketModel
            .findById( ticketId ).populate(["owner","user","event"]);
        if( ! ticketExists ){
            throw new HttpException("ticket not found",400);
        };
        if(user.role != "user"){
            return { ticket:ticketExists };
        }
        if( 
            // @ts-ignore;
            user._id.toString() != ticketExists.owner?._id?.toString() && 
            // @ts-ignore;
            user._id.toString() != ticketExists.user?._id?.toString()
        ){
            throw new HttpException("you are not allowed to get this ticket",400);
        };
        return { ticket:ticketExists };
    };
    async getAllTickets(query:QueryTicketDto,user:UserDoc){
        let obj={};
        if(user.role == "user"){
            obj={ $or : [{owner:user._id},{user:user._id}] }
        };
        const {paginationObj,query:data}=await this.filter
            .filter(this.ticketModel.find(),{ ... query , ... obj }).select()
            .sort().population(["owner","user","event"])
            .search().pagination();
        let tickets=await data;
        return { tickets , paginationObj };
    };
}