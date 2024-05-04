using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Azure.Communication.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GraphACSFunctions;

public class ACSTokenFunction
{
    private static readonly CommunicationTokenScope[] Scopes =
    [
        CommunicationTokenScope.VoIP,
    ];

    private readonly CommunicationIdentityClient _tokenClient;

    public ACSTokenFunction(CommunicationIdentityClient tokenClient)
    {
        _tokenClient = tokenClient;
    }

    [Function("HttpTriggerAcsToken")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequestData req,
        ILogger log)
    {
        var user = await _tokenClient.CreateUserAsync();
        var userToken = await _tokenClient.GetTokenAsync(user, Scopes);

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(
            new
            {
                userId = user.Value.Id,
                userToken.Value.Token,
                userToken.Value.ExpiresOn
            }
        );
        return response;
    }
}
