import { Controller, Post, Req } from "@nestjs/common";
import { Request } from "express";

@Controller("paytab")
export class paytabController {
    @Post()
    async logQuery(@Req() req:Request ){
        console.log(req.query);
        if(req.query.tranRef){
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
                        'tran_ref':req.query.tranRef
                    })
                });
            console.log(res.ok);
            const data=await res.json();
            console.log(data);
        };
    }
};