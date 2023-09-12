import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import todosService from '../../service';
import schema from './schema';


const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    const id = event.pathParameters.id;
    try {
        const todo = await todosService.updateTodo(id, event.body)
        return formatJSONResponse({
            todo, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
};

export const updateTodo = middyfy(handler);