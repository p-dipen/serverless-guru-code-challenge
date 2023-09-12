import schema from './schema';
import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.createTodo`,
    events: [
        {
            http: {
                method: 'post',
                path: 'todo',
                request: {
                    schemas: {
                        'application/json': schema,
                    },
                },
            },
        },
    ],
};