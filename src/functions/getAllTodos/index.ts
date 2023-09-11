import { handlerPath } from '@libs/handler-resolver';

export default {
    handler: `${handlerPath(__dirname)}/handler.getAllTodos`,
    events: [
        {
            http: {
                method: 'get',
                path: 'getall',
            },
        },
    ],
};
