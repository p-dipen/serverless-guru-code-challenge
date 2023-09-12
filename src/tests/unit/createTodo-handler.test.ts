import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { createTodo } from "../../functions/createTodo/handler";
import { MockProxy, mock } from 'jest-mock-extended';
import todosService from '../../service';
import mockData from "./utils/mock.json";
import type { TestingEventWithBody } from './utils/common';

jest.mock('../../service');

describe('Unit test for createTodo handler', function () {
    it('verifies successful response from createTodo', async () => {
        const mockGetAllTodo = jest.fn();
        jest.spyOn(todosService, "createTodo").mockImplementation(mockGetAllTodo);
        let context: MockProxy<Context>;
        const event: TestingEventWithBody = mock<TestingEventWithBody>({
            body: { title: mockData.todo.title, description: mockData.todo.description }
        }) as any;
        mockGetAllTodo.mockResolvedValue(mockData.todo)
        const result = await createTodo(event, context)
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(JSON.stringify({ "todo": mockData.todo }));
        mockGetAllTodo.mockReset();
    });
    it('verifies failed response from createTodo', async () => {
        let context: MockProxy<Context>;
        const event: TestingEventWithBody = mock<APIGatewayProxyEvent>({
            body: JSON.stringify({})
        }) as any;
        const result = await createTodo(event, context)
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(JSON.stringify({
            "status": 400, "message": "Invalid request body"
        }));
    });
});