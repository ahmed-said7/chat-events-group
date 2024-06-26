"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paytab = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const event_emitter_1 = require("@nestjs/event-emitter");
;
;
let Paytab = class Paytab {
    constructor(events) {
        this.events = events;
    }
    ;
    async paymentUrlUsingAxios(res, user, meta, url) {
        return this.payUrl(res, user, url.callback, url.response, meta.cartId, meta.price);
    }
    ;
    async ValidateOfferPayment(req) {
        if (req.body.tran_ref) {
            this.validationCallback(req.body.tran_ref).then((res) => {
                const data = res.data;
                if (data?.payment_result?.response_status && data?.payment_result?.response_status == "A") {
                    this.events.emit("ticket.payment", data);
                }
                ;
            }).catch((error) => {
                console.error('Payment query failed:', error);
            });
        }
        ;
    }
    ;
    payUrl(res, user, callback, response, cartId, price) {
        const profileId = process.env.profileId;
        const serverKey = process.env.serverkey;
        const data = {
            profile_id: profileId,
            tran_type: "sale",
            tran_class: "ecom",
            cart_id: cartId,
            cart_description: "buy mechanical parts",
            cart_currency: process.env.currency,
            cart_amount: price,
            callback: callback,
            return: response,
            customer_details: {
                name: user?.name,
                email: user?.email
            }
        };
        const headers = {
            'Authorization': serverKey,
            'Content-Type': 'application/json'
        };
        axios_1.default.post("https://secure.paytabs.sa/payment/request", data, { headers })
            .then(response => {
            res.status(200).json({ data: response.data.redirect_url });
        })
            .catch(error => {
            throw new common_1.HttpException("creating payment url error", 400);
        });
    }
    ;
    validationCallback(tran_ref) {
        const profileId = process.env.profileId;
        const tranRef = tran_ref;
        const serverKey = process.env.serverkey;
        const data = {
            profile_id: profileId,
            tran_ref: tranRef
        };
        const config = { method: 'post',
            url: "https://secure.paytabs.sa/payment/query",
            headers: {
                Authorization: serverKey,
                'Content-Type': 'application/json'
            },
            data
        };
        return (0, axios_1.default)(config);
    }
    ;
};
exports.Paytab = Paytab;
exports.Paytab = Paytab = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], Paytab);
;
//# sourceMappingURL=paytab.js.map