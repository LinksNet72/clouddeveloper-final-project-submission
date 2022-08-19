// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '2o1j9pdyja'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-1cxsa-6w.us.auth0.com',            // Auth0 domain
  clientId: 'dl77rxeoPgVkOfeIWA8kQE4RGFwGCSS4',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
