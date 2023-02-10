using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Azure.Identity;
using Microsoft.Graph;

namespace ExerciseACS;

public static class TeamsMeetingFunction
{
    [FunctionName("TeamsMeetingFunction")]
    public static async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
        ILogger log)
    {
        var clientSecretCredential = new ClientSecretCredential(
            Environment.GetEnvironmentVariable("TENANT_ID"),
            Environment.GetEnvironmentVariable("CLIENT_ID"),
            Environment.GetEnvironmentVariable("CLIENT_SECRET")
        );

        var graphServiceClient = new GraphServiceClient(
            clientSecretCredential,
            new[] { "https://graph.microsoft.com/.default" }
        );

        var userId = Environment.GetEnvironmentVariable("USER_ID");
        var newEvent = await graphServiceClient.Users[userId].Calendar.Events.Request().AddAsync(new()
        {
            Subject = "Customer Service Meeting",
            Start = new() { DateTime = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss"), TimeZone = "UTC" },
            End = new() { DateTime = DateTime.UtcNow.AddHours(1).ToString("yyyy-MM-ddTHH:mm:ss"), TimeZone = "UTC" },
            IsOnlineMeeting = true
        });
        return new OkObjectResult(newEvent.OnlineMeeting.JoinUrl);
    }
}
