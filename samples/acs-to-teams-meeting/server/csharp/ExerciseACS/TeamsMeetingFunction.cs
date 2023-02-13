using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Graph;
using Microsoft.Extensions.Configuration;

namespace ExerciseACS;

public class TeamsMeetingFunction
{
    private readonly GraphServiceClient _graphServiceClient;
    private readonly IConfiguration _configuration;

    public TeamsMeetingFunction(GraphServiceClient graphServiceClient, IConfiguration configuration)
    {
        _graphServiceClient = graphServiceClient;
        _configuration = configuration;
    }

    [FunctionName("TeamsMeetingFunction")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
        ILogger log)
    {
        var userId = _configuration.GetValue<string>("USER_ID");
        var newEvent = await CreateMeetingEventAsync(userId);

        return new OkObjectResult(newEvent.OnlineMeeting.JoinUrl);
    }

    private async Task<Event> CreateMeetingEventAsync(string userId) => 
        await _graphServiceClient
            .Users[userId]
            .Calendar
            .Events
            .Request()
            .AddAsync(new()
            {
                Subject = "Customer Service Meeting",
                Start = new()
                {
                    DateTime = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss"),
                    TimeZone = "UTC"
                },
                End = new()
                {
                    DateTime = DateTime.UtcNow.AddHours(1).ToString("yyyy-MM-ddTHH:mm:ss"),
                    TimeZone = "UTC"
                },
                IsOnlineMeeting = true
            });
}
