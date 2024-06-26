import { Socket } from "socket.io";
import { mongodbId } from "src/group/group.service";
import { UserDoc } from "src/schema.factory/user.schema";
export interface AuthSocket extends Socket {
    user: UserDoc;
}
export declare class WebsocketService {
    private connectedUsers;
    addConnectedUser(socket: AuthSocket): void;
    getConnectedUser(userId: mongodbId): AuthSocket;
    deleteConnectedUser(userId: mongodbId): boolean;
}
