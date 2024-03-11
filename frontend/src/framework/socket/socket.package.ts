import { type Socket as LibrarySocket, io } from 'socket.io-client';

class Socket {
    public getInstance = (namespace: string): LibrarySocket => {
        return io(namespace, {
            transports: ['websocket'],
        });
    };
}

export { Socket };
