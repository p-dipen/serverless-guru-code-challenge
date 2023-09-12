import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '../../libs/api-gateway';
import { middyfy } from '../../libs/lambda';
import todosService from '../../service'

export const getAllTodos = middyfy(async (): Promise<APIGatewayProxyResult> => {
    try {
        const todos = await todosService.getAllTodos();
        return formatJSONResponse({
            todos
        })
    } catch (error) {
        console.error(error)
    }
})

export const getTodo = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const todo = await todosService.getTodo(id);
        return formatJSONResponse({
            todo, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})