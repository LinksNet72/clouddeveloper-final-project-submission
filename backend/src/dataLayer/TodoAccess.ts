import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Types } from 'aws-sdk/clients/s3';
import { TodoItem } from "../models/TodoItem";
import { TodoUpdate } from "../models/TodoUpdate";


export class TodoAccess {
    constructor(
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly s3Client: Types = new AWS.S3({ signatureVersion: 'v4' }),
        private readonly todoTable = process.env.TODOS_TABLE,
        private readonly todoIndex = process.env.TODOS_CREATED_AT_INDEX,
        private readonly s3Bucket = process.env.ATTACHMENT_S3_BUCKET) {
    }

    async getAllTodo(userId: string): Promise<TodoItem[]> {
        console.log("Getting all todo items");

        const params = {
            TableName: this.todoTable,
            IndexName: this.todoIndex,
            KeyConditionExpression: "#userId = :userId",
            ExpressionAttributeNames: {
                "#userId": "userId"
            },
            ExpressionAttributeValues: {
                ":userId": userId
            }
        };

        const result = await this.docClient.query(params).promise();
        console.log(result);
        const items = result.Items;

        return items as TodoItem[];
    }

    async createTodo(todoItem: TodoItem): Promise<TodoItem> {
        console.log("Creating a new todo item");

        const params = {
            TableName: this.todoTable,
            Item: todoItem,
        };

        const result = await this.docClient.put(params).promise();
        console.log(result);

        return todoItem as TodoItem;
    }

    async updateTodo(todoUpdate: TodoUpdate, todoId: string, userId: string): Promise<TodoUpdate> {
        console.log("Updating todo item");

        const params = {
            TableName: this.todoTable,
            Key: {
                "userId": userId,
                "todoId": todoId
            },
            UpdateExpression: "set #a = :a, #b = :b, #c = :c",
            ExpressionAttributeNames: {
                "#a": "name",
                "#b": "dueDate",
                "#c": "done"
            },
            ExpressionAttributeValues: {
                ":a": todoUpdate['name'],
                ":b": todoUpdate['dueDate'],
                ":c": todoUpdate['done']
            },
            ReturnValues: "ALL_NEW"
        };

        const result = await this.docClient.update(params).promise();
        console.log(result);
        const attributes = result.Attributes;

        return attributes as TodoUpdate;
    }

    async deleteTodo(todoId: string, userId: string): Promise<string> {
        console.log("Deleting todo item");

        const params = {
            TableName: this.todoTable,
            Key: {
                "userId": userId,
                "todoId": todoId
            },
        };

        const result = await this.docClient.delete(params).promise();
        console.log(result);

        return "" as string;
    }

    async generateUploadUrl(todoId: string): Promise<string> {
        console.log("Generating Image URL");

        const url = this.s3Client.getSignedUrl('putObject', {
            Bucket: this.s3Bucket,
            Key: todoId,
            Expires: 1000,
        });
        console.log(url);

        return url as string;
    }
}