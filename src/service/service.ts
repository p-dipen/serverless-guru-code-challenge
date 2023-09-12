import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Todo from "../model/Todo";

export default class TodoService {

    private Tablename: string = "TodosTable";

    constructor(private docClient: DocumentClient) { }

    async getAllTodos(): Promise<Todo[]> {
        const todos = await this.docClient.scan({
            TableName: this.Tablename,
        }).promise()
        return todos.Items as Todo[];
    }

    async getTodo(id: string): Promise<any> {

        const todo = await this.docClient.get({
            TableName: this.Tablename,
            Key: {
                todosId: id
            }
        }).promise()
        if (!todo.Item) {
            throw new Error("Id does not exit");
        }
        return todo.Item as Todo;

    }

    async createTodo(todo: Todo): Promise<Todo> {
        await this.docClient.put({
            TableName: this.Tablename,
            Item: todo
        }).promise()
        return todo as Todo;

    }

    async updateTodo(id: string, todo?: Partial<Todo>): Promise<Todo> {
        const updated = await this.docClient
            .update({
                TableName: this.Tablename,
                Key: { todosId: id },
                ...getUpdateParams(todo),
                ReturnValues: "ALL_NEW",
            })
            .promise();
        return updated.Attributes as Todo;
    }

    async deleteTodo(id: string): Promise<any> {
        return await this.docClient.delete({
            TableName: this.Tablename,
            Key: {
                todosId: id
            }
        }).promise();
    }
}

export const getUpdateParams = (params: { [key: string]: any }) => ({
    UpdateExpression: `set ${Object.entries(params)
        .map(([key]) => `#${key} = :${key}, `)
        .reduce((acc, str) => acc + str)
        .slice(0, -2)}`,

    ExpressionAttributeNames: Object.keys(params).reduce(
        (acc, key) => ({
            ...acc,
            [`#${key}`]: key,
        }),
        {}
    ),

    ExpressionAttributeValues: Object.entries(params).reduce(
        (acc, [key, value]) => ({
            ...acc,
            [`:${key}`]: value,
        }),
        {}
    ),
})