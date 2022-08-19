import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
// import * as middy from 'middy'
// import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteTodo } from '../../businessLogic/todos'
//import { getUserId } from '../utils'

export const handler: APIGatewayProxyHandler = 
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Remove a TODO item by id
    console.log("Caller Event ", event);

    const authorization = event.headers.Authorization;
    const split = authorization.split(' ')
    const jwtToken = split[1]
    const deleteItem = await deleteTodo(todoId, jwtToken)

    return {
      statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: deleteItem,
    }
  }
