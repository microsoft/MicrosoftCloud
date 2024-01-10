import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CommunicationIdentityClient } from '@azure/communication-identity';

export async function httpTriggerAcsToken(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    // Get ACS connection string from local.settings.json (or App Settings when in Azure)
    const connectionString = process.env.ACS_CONNECTION_STRING;
    let tokenClient = new CommunicationIdentityClient(connectionString);
    const user = await tokenClient.createUser();
    const userToken = await tokenClient.getToken(user, ["voip"]);
    return {
        jsonBody: { userId: user.communicationUserId, ...userToken }
    };
}

app.http('httpTriggerAcsToken', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: httpTriggerAcsToken
});

export default httpTriggerAcsToken;