import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.deleteTodo`,
    events: [
        {
            http: {
                method: 'delete',
                path: 'todo/{id}',
            },
        },
    ],
};