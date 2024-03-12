import { Status } from '../enums/status.enum.js';

const chatsLinksData = [
    {
        id: 1,
        status: Status.ONLINE,
        lastMessage:
            'Hi! How are youHi! How are youHi! How are youHi! How are you',
        username: 'User1',
    },
    {
        id: 2,
        status: Status.OFFLINE,
        lastMessage: 'Hi!',
        username: 'User2',
    },
    {
        id: 3,
        status: Status.ONLINE,
        lastMessage: 'Hello!',
        username: 'User3',
    },
];

export { chatsLinksData };
