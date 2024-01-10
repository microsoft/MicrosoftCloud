import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import createNewMeetingAsync from '../../Shared/graph';

let teamsMeetingLink;

export async function httpTriggerTeamsUrl(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log("Request received");
    const userId = process.env.USER_ID;
    context.log('UserId', userId);
    
    teamsMeetingLink = await createNewMeetingAsync(userId);
    const body = JSON.stringify(teamsMeetingLink);
    const meeting = JSON.parse(body);
    context.log("meeting:", meeting);
    
    return {
        // status: 200, /* Defaults to 200 */
        body: meeting.onlineMeeting.joinUrl
    }    
};

app.http('httpTriggerTeamsUrl', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: httpTriggerTeamsUrl
});

export default httpTriggerTeamsUrl;