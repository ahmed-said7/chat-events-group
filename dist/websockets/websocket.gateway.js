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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketEvents = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const models_1 = require("../enums/models");
const websocket_service_1 = require("./websocket.service");
;
let WebSocketEvents = class WebSocketEvents {
    constructor(config, UserModel, SocketService) {
        this.config = config;
        this.UserModel = UserModel;
        this.SocketService = SocketService;
    }
    ;
    async handleConnection(client, ...args) {
        let token;
        const authorization = client.handshake.headers.authorization;
        if (authorization
            && authorization.startsWith("Bearer")) {
            token = authorization.split(" ")[1];
        }
        ;
        if (!token) {
            client.disconnect();
        }
        ;
        let decoded = null;
        try {
            decoded = jwt.verify(token, this.config.get("secret"));
        }
        catch (e) {
            client.disconnect();
        }
        ;
        if (!decoded)
            client.disconnect();
        const user = await this.UserModel.findById(decoded?.userId);
        if (!user) {
            client.disconnect();
        }
        ;
        if (user.passwordChangedAt) {
            const stamps = new Date(user.passwordChangedAt).getTime() / 1000;
            if (stamps > decoded.iat) {
                client.disconnect();
            }
            ;
        }
        ;
        client.user = user;
        this.SocketService.addConnectedUser(client);
    }
    ;
    async handleDisconnect(client) {
        if (client.user) {
            this.SocketService.deleteConnectedUser(client.user._id);
        }
        ;
    }
    ;
};
exports.WebSocketEvents = WebSocketEvents;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebSocketEvents.prototype, "server", void 0);
exports.WebSocketEvents = WebSocketEvents = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __param(1, (0, mongoose_2.InjectModel)(models_1.Models.User)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_1.Model,
        websocket_service_1.WebsocketService])
], WebSocketEvents);
;
//# sourceMappingURL=websocket.gateway.js.map