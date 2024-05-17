import { Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from "express";

@Controller("paytab")
export class paytabController {
    @Post()
    async logQuery(@Req() req:Request ){
        // @ts-ignore
        console.log(req.query,req.tranRef);
        // @ts-ignore
        if(req.tranRef){
            const res=await 
                fetch('https://merchant-egypt.paytabs.com/payment/query'
                ,{
                    method: 'POST',
                    headers:{
                        'Authorization':"S9J99ZWKLN-JJ6J66WLTL-ZZRHJTG2GL",
                        'Content-Type':"application/json"
                    },
                    body:JSON.stringify({ 
                        'profile_id':"137405",
                        // @ts-ignore
                        'tran_ref':req.tranRef
                    })
                });
            console.log(res.ok);
            const data=await res.json();
            console.log(data);
            // ['payment_result']['response_status']
            if( data?.payment_result?.response_status && data?.payment_result?.response_status == "A" ){
                console.log("paymentSucceded");
            }
        };
    }
    @Get()
    async getPayment(){
        return { status:"paid" }
    };
};