import { type Server } from 'node:http';

import { type Socket as TSocket, Server as SocketServer } from 'socket.io';

import { SocketEvent, SocketNamespace } from './enums/enums.js';

type MessageProperties<T> = {
    membersId: string[];
    payload: T;
};

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
        socket.on(SocketEvent.CHAT_JOIN_ROOM, (userId: string) => {
            void socket.join(userId);
        });

        socket.on(SocketEvent.CHAT_LEAVE_ROOM, (userId: string) => {
            void socket.leave(userId);
        });
    }

    public sendMessage<T>({ membersId, payload }: MessageProperties<T>): void {
        this._io
            .of(SocketNamespace.CHAT)
            .to(membersId)
            .emit(SocketEvent.CHAT_SEND_MESSAGE, payload);
    }
}

export { SocketService };
