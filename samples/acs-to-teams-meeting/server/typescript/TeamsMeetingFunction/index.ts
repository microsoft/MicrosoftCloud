import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import CreateNewMeetingAsync from '../Shared/graph';
let teamsMeetingLink = undefined;
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest){
    console.log("Request received");
    
    teamsMeetingLink = await CreateNewMeetingAsync('8fe146c8-21df-4ae1-9aca-375012b13d96');
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