"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketService = void 0;
const common_1 = require("@nestjs/common");
;
let WebsocketService = class WebsocketService {
    constructor() {
        this.connectedUsers = new Map();
    }
    addConnectedUser(socket) {
        this.connectedUsers.set(socket.user._id, socket);
    }
    ;
    getConnectedUser(userId) {
        return this.connectedUsers.get(userId);
    }
    ;
    deleteConnectedUser(userId) {
        return this.connectedUsers.delete(userId);
    }
    ;
};
exports.WebsocketService = WebsocketService;
exports.WebsocketService = WebsocketService = __decorate([
    (0, common_1.Injectable)()
], WebsocketService);
;
//# sourceMappingURL=websocket.service.js.map