import { APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import todosService from '../../service'

export const getAllTodos = middyfy(async (): Promise<APIGatewayProxyResult> => {
    console.log("Get ALL")
    try {
        const todos = await todosService.getAllTodos();
        console.log("todos", todos)
        return formatJSONResponse({
            todos
        })
    } catch (error) {
        console.error(error)
    }

})