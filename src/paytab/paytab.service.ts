import {  Injectable } from "@nestjs/common";
import { UserDoc } from "src/schema.factory/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Models } from "src/enums/models";
import { Model } from "mongoose";
import { Request, Response } from "express";
import { OnEvent } from "@nestjs/event-emitter";
import { IResponsePaytab, Paytab } from "./paytab";
import { EventDoc } from "src/schema.factory/events.schema";
import { mongodbId } from "src/group/group.service";
import { TicketDoc } from "src/schema.factory/ticket.schema";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PaytabService {
    constructor(
        private paytab:Paytab,
        private config:ConfigService,
        @InjectModel(Models.Event) private eventModel:Model<EventDoc>,
        @InjectModel(Models.Ticket) private ticketModel:Model<TicketDoc>
    ){}
    async createTicketPaymentUrl(res:Response, eventId:mongodbId,user:UserDoc ){
        const event=await this.eventModel.findById(eventId);
        const ticket=await this.ticketModel.create({
            price:event.price,
            user:user._id,
            owner:event.admin,
            event:event._id
        });
        if( ticket.price == 0 ){
            ticket.isPaid=true;
            ticket.paidAt=new Date()
            await ticket.save();
            res.status(200).json( { ticket } );
        };
        const meta={ price:ticket.price ,  cartId: ticket._id  };
        const urls={ 
            callback:this.config.get("callback"), 
            response:this.config.get("response") 
        };
        this.paytab.paymentUrlUsingAxios(res,user,meta,urls)
    };
    async validateOfferCallback(req:Request){
        this.paytab.ValidateOfferPayment(req);
    };
    @OnEvent("ticket.payment")
    private async ticketPaymentCreated(data:IResponsePaytab){
        const ticket=await this.ticketModel.findByIdAndUpdate(
            data.cart_id
            ,{
                isPaid:true,
                paidAt:new Date()
            }
        );
        console.log(ticket);
        if(!ticket){
            console.log("No offer found",400);
            return;
        };
    };
};