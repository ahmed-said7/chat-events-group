import { Controller, Get, Post, Req } from "@nestjs/common";
import { Request } from "express";
import axios from "axios";

@Controller("paytab")
export class paytabController {
    @Post()
    async logQuery(@Req() req:Request ){
        if(req.body.tranRef){
            const data = {
                profile_id: "137405",
                tran_ref: req.body.tranRef
            };
            const config = {
                method: 'post',
                url: 'https://secure-egypt.paytabs.com/payment/query',
                headers: {
                    Authorization: `S9J99ZWKLN-JJ6J66WLTL-ZZRHJTG2GL`,
                    'Content-Type': 'application/json',
                }, data
            };
            axios(config)
                .then((response) => {
                  console.log(response.data); // Handle the successful response data here
                })
                .catch((error) => {
                  console.error(error); // Handle any errors during the request
                });
        };
    }
    @Post("response")
    async getPayment(){
        return { status:"paid" }
    };
};