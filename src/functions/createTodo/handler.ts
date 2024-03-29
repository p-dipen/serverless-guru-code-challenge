import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import todosService from '../../service'
import { v4 } from "uuid";
import type { ValidatedEventAPIGatewayProxyEvent } from '../../libs/api-gateway';
import schema from './schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    try {
        if (event.body.title == undefined || event.body.description == undefined || event.body.title == '' || event.body.description == '') {
            return formatJSONResponse({
                status: 400,
                message: "Invalid request body"
            });
        }
        const id = v4();
        const todo = await todosService.createTodo({
            todosId: id,
            title: event.body.title,
            description: event.body.description,
            createdAt: new Date().toISOString(),
            status: false
        })
        return formatJSONResponse({
            todo
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
};

export const createTodo = middyfy(handler);