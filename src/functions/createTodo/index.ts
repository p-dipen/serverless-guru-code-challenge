import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.createTodo`,
    events: [
        {
            http: {
                method: 'post',
                path: 'create',
                request: {
                    schemas: {
                        'application/json': schema,
                    },
                },
            },
        },
    ],
};