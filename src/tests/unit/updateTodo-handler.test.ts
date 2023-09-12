import { Context } from "aws-lambda";
import { updateTodo } from "../../functions/updateTodo/handler";
import { MockProxy, mock } from 'jest-mock-extended';
import todosService from '../../service';
import mockData from "./utils/mock.json";
import type { TestingEventWithBody } from './utils/common';

jest.mock('../../service');

describe('Unit test for updateTodo handler', function () {
    it('verifies successful response from updateTodo', async () => {
        const mockGetAllTodo = jest.fn();
        let data = mockData.todo;
        data.title = "todo-new"
        jest.spyOn(todosService, "updateTodo").mockImplementation(mockGetAllTodo);
        let context: MockProxy<Context>;
        const event: TestingEventWithBody = mock<TestingEventWithBody>({
            body: mockData.todo,
            pathParameters: {
                id: mockData.id
            }
        }) as any;
        mockGetAllTodo.mockResolvedValue(data)
        const result = await updateTodo(event, context)
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(JSON.stringify({ "todo": data, "id": mockData.id }));
        mockGetAllTodo.mockReset();
    });
});