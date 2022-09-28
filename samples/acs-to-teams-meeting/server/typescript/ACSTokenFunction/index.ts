import { CommunicationIdentityClient } from '@azure/communication-identity';

module.exports = async function (context, req) {
    // Get ACS connection string from local.settings.json (or App Settings when in Azure)
    const connectionString = process.env.ACS_CONNECTION_STRING;
    let tokenClient = new CommunicationIdentityClient(connectionString);
    const user = await tokenClient.createUser();
    const userToken = await tokenClient.getToken(user, ["voip"]);
    context.res = {
        body: { userId: user.communicationUserId, ...userToken }
    };
}