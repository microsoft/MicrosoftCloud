using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Azure.Communication.Identity;

namespace ExerciseACS
{
    public static class ACSTokenFunction
    {
        [FunctionName("ACSTokenFunction")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            var connectionString = Environment.GetEnvironmentVariable("ACS_CONNECTION_STRING");
            var tokenClient = new CommunicationIdentityClient(connectionString);
            var user = await tokenClient.CreateUserAsync();
            var userToken = await tokenClient.GetTokenAsync(user, new[] { CommunicationTokenScope.VoIP });

            return new OkObjectResult(new { userId = user.Value.Id, userToken.Value.Token, userToken.Value.ExpiresOn });
        }
    }
}
