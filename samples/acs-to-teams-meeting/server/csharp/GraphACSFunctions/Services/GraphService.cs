using System;
using System.Threading.Tasks;
using Microsoft.Graph;
using Microsoft.Extensions.Configuration;

namespace GraphACSFunctions.Services;

public class GraphService : IGraphService
{
    private readonly GraphServiceClient _graphServiceClient;
    private readonly IConfiguration _configuration;

    public GraphService(GraphServiceClient graphServiceClient, IConfiguration configuration)
    {
        _graphServiceClient = graphServiceClient;
        _configuration = configuration;
    }

    public async Task<string> CreateMeetingAsync()
    {
        var newMeeting = await _graphServiceClient
            .Users[_configuration["USER_ID"]]
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
        return newMeeting.OnlineMeeting.JoinUrl;
    }
}
