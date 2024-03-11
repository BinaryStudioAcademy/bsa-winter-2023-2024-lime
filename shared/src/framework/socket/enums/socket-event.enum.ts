const SocketEvent = {
    CONNECTION: 'connection',
    CHAT_JOIN_ROOM: 'chat-join-room',
    CHAT_LEAVE_ROOM: 'chat-leave-room',
    CHAT_SEND_MESSAGE: 'chat-send-message',
    CHAT_RECEIVE_MESSAGE: 'chat-receive-message',
} as const;

export { SocketEvent };
