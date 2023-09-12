import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { getTodo, getAllTodos } from "../../functions/getTodo/handler";
import { MockProxy, mock } from 'jest-mock-extended';
import todosService from '../../service';
import mockData from "./utils/mock.json";
import type { TestingEventWithBody } from './utils/common';

jest.mock('../../service');

describe('Unit test for getTodo handler', function () {
    it('verifies successful response from getTodo by id', async () => {
        const mockGetAllTodo = jest.fn();
        jest.spyOn(todosService, "getTodo").mockImplementation(mockGetAllTodo);
        let context: MockProxy<Context>;
        const event: TestingEventWithBody = mock<APIGatewayProxyEvent>({
            pathParameters: {
                id: mockData.id
            }
        }) as any;
        mockGetAllTodo.mockResolvedValue(mockData.todo)
        const result = await getTodo(event, context)
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(JSON.stringify(mockData));
        mockGetAllTodo.mockReset();
    });

    it('verifies successful response from getTodoAll', async () => {
        const mockGetAllTodo = jest.fn();
        jest.spyOn(todosService, "getAllTodos").mockImplementation(mockGetAllTodo);
        let context: MockProxy<Context>;
        const event: TestingEventWithBody = mock<APIGatewayProxyEvent>() as any;
        mockGetAllTodo.mockResolvedValue([mockData.todo])
        const result = await getAllTodos(event, context)
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(JSON.stringify({ "todos": [mockData.todo] }));
        mockGetAllTodo.mockReset();
    });
});