using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Azure.Communication.Identity;

namespace ExerciseACS;

public class ACSTokenFunction
{
    private static readonly CommunicationTokenScope[] Scopes = new[]
    {
        CommunicationTokenScope.VoIP,
    };

    private readonly CommunicationIdentityClient _tokenClient;

    public ACSTokenFunction(CommunicationIdentityClient tokenClient)
    {
        _tokenClient = tokenClient;
    }

    [FunctionName("ACSTokenFunction")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
        ILogger log)
    {
        var user = await _tokenClient.CreateUserAsync();
        var userToken = await _tokenClient.GetTokenAsync(user, Scopes);

        return new OkObjectResult(new 
        { 
            userId = user.Value.Id, 
            userToken.Value.Token, 
            userToken.Value.ExpiresOn 
        });
    }
}
