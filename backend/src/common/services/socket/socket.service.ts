import { type Server } from 'node:http';

import { type Socket as TSocket } from 'socket.io';
import { Server as SocketServer } from 'socket.io';

import { SocketEvent, SocketNamespace } from './enums/enums.js';

class SocketService {
    private _io!: SocketServer;

    public get io(): SocketServer {
        return this._io;
    }

    public initializeIo(server: Server): void {
        this._io = new SocketServer(server);
        this._io
            .of(SocketNamespace.CHAT)
            .on(SocketEvent.CONNECTION, this.chatHandler.bind(this));
    }

    private chatHandler(socket: TSocket): void {
        socket.on(SocketEvent.CHAT_JOIN_ROOM, (roomId: string) => {
            void socket.join(roomId);
        });

        socket.on(SocketEvent.CHAT_LEAVE_ROOM, (roomId: string) => {
            void socket.leave(roomId);
        });
    }
}

export { SocketService };
