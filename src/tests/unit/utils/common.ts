import { APIGatewayProxyEvent } from "aws-lambda";

type JsonValue =
    | string
    | number
    | boolean
    | JSONObject
    | JSONArray;

interface JSONArray extends Array<JsonValue> { }


interface JSONObject {
    [x: string]: JsonValue;
}

export type TestingEventWithBody = Omit<APIGatewayProxyEvent, "body"> & { body: JsonValue; rawBody: string; };
