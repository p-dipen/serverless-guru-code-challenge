import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.updateTodo`,
    events: [
        {
            http: {
                method: 'put',
                path: 'todo/{id}',
            },
        },
    ],
};