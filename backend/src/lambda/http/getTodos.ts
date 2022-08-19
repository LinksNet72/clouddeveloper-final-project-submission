import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
// import * as middy from 'middy'
// import { cors } from 'middy/middlewares'

//import { getTodosForUser as getTodosForUser, getAllTodo } from '../../businessLogic/todos'
import { getAllTodo } from '../../businessLogic/todos'
//import { getUserId } from '../utils';

// TODO: Get all TODO items for a current user
export const handler: APIGatewayProxyHandler = 
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // Write your code here
    console.log("Caller Event ", event);

    const authorization = event.headers.Authorization;
    const split = authorization.split(' ')
    const jwtToken = split[1]
    
    const todos = await getAllTodo(jwtToken);

    return {
      statusCode: 200,
      headers: {
          "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
          "items": todos
      }),
  }
}