import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import 'source-map-support/register'
// import * as middy from 'middy'
// import { cors } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
//import { getUserId } from '../utils';
import { createTodo } from '../../businessLogic/todos'

export const handler: APIGatewayProxyHandler = 
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // TODO: Implement creating a new TODO item
    console.log("Caller Event ", event);

    const authorization = event.headers.Authorization
    const split = authorization.split(' ')
    const jwtToken = split[1]
    
    const todoItem = await createTodo(newTodo, jwtToken)

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
    },
      body: JSON.stringify({
        "item": todoItem
      })
    }

  }
