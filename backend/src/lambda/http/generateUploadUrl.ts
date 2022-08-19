import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
// import * as middy from 'middy'
// import { cors, httpErrorHandler } from 'middy/middlewares'

//import { createAttachmentPresignedUrl, generateUploadUrl } from '../../businessLogic/todos'
import { generateUploadUrl } from '../../businessLogic/todos'
//import { getUserId } from '../utils'

export const handler: APIGatewayProxyHandler =
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    console.log("Caller Event ", event);

    const url = await generateUploadUrl(todoId)

    return {
      statusCode: 202,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          uploadUrl: url
        })
    }
  }
