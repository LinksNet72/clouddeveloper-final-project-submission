import {TodoItem} from "../models/TodoItem";
import {parseUserId} from "../auth/utils";
import {CreateTodoRequest} from "../requests/CreateTodoRequest";
import {UpdateTodoRequest} from "../requests/UpdateTodoRequest";
import {TodoUpdate} from "../models/TodoUpdate";
import {TodoAccess} from "../dataLayer/TodoAccess";

const uuidv4 = require('uuid/v4');
const todoAccess = new TodoAccess();

export async function getAllTodo(jwtToken: string): Promise<TodoItem[]> {
    const userId = parseUserId(jwtToken);
    return todoAccess.getAllTodo(userId);
}

export function createTodo(createTodoRequest: CreateTodoRequest, jwtToken: string): Promise<TodoItem> {
    const s3Bucket = process.env.ATTACHMENT_S3_BUCKET;
    const userId = parseUserId(jwtToken);
    const todoId =  uuidv4();
    
    return todoAccess.createTodo({
        userId: userId,
        todoId: todoId,
        attachmentUrl:  `https://${s3Bucket}.s3.amazonaws.com/${todoId}`, 
        createdAt: new Date().getTime().toString(),
        done: false,
        ...createTodoRequest,
    });
}

export function updateTodo(updateTodoRequest: UpdateTodoRequest, todoId: string, jwtToken: string): Promise<TodoUpdate> {
    const userId = parseUserId(jwtToken);
    return todoAccess.updateTodo(updateTodoRequest, todoId, userId);
}

export function deleteTodo(todoId: string, jwtToken: string): Promise<string> {
    const userId = parseUserId(jwtToken);
    return todoAccess.deleteTodo(todoId, userId);
}

export function generateUploadUrl(todoId: string): Promise<string> {
    return todoAccess.generateUploadUrl(todoId);
}