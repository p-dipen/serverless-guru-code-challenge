import { handlerPath } from '@libs/handler-resolver';
import schema from './schema';

export default {
    handler: `${handlerPath(__dirname)}/handler.updateTodo`,
    events: [
        {
            http: {
                method: 'put',
                path: 'todo/{id}',
                request: {
                    schemas: {
                        'application/json': schema,
                    },
                },
            },
        },
    ],
};