import { Context } from "aws-lambda";
import { deleteTodo } from "../../functions/deleteTodo/handler";
import { MockProxy, mock } from 'jest-mock-extended';
import todosService from '../../service';
import mockData from "./utils/mock.json";
import type { TestingEventWithBody } from './utils/common';

jest.mock('../../service');

describe('Unit test for deleteTodo handler', function () {
    it('verifies successful response from deleteTodo', async () => {
        const mockGetAllTodo = jest.fn();
        jest.spyOn(todosService, "deleteTodo").mockImplementation(mockGetAllTodo);
        let context: MockProxy<Context>;
        const event: TestingEventWithBody = mock<TestingEventWithBody>({
            pathParameters: {
                id: mockData.id
            }
        }) as any;
        mockGetAllTodo.mockResolvedValue({})
        const result = await deleteTodo(event, context)
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual(JSON.stringify({ "todo": {}, "id": mockData.id }));
        mockGetAllTodo.mockReset();
    });
});