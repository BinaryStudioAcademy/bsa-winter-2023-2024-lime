import fastifyPlugin from 'fastify-plugin';
import { type Server as SocketServer } from 'socket.io';

import { PluginName } from '~/common/enums/enums.js';

type Options = {
    io: SocketServer;
};

const socketInjectorPlugin = fastifyPlugin<Options>(
    (fastify, { io }, done) => {
        fastify.decorateRequest('io', null);
        fastify.addHook('preHandler', (request, _reply, done) => {
            request.io = io;
            done();
        });
        done();
    },
    { name: PluginName.SOCKET_INJECTOR },
);

export { socketInjectorPlugin };
