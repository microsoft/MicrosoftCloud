import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import CreateNewMeetingAsync from '../Shared/graph';

let teamsMeetingLink;

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest){
    console.log("Request received");
    
    teamsMeetingLink = await CreateNewMeetingAsync(process.env.USER_ID);
    const body = JSON.stringify(teamsMeetingLink);
    console.log("body", body);
    const jsonMessage = JSON.parse(body);
    console.log("function response:", jsonMessage);
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: jsonMessage.onlineMeeting.joinUrl
    }
   
    
};

export default httpTrigger;