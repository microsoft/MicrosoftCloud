using Microsoft.Extensions.Configuration;
using Microsoft.Graph;
using System;
using System.Threading.Tasks;

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
        var userId = _configuration.GetValue<string>("USER_ID");
        var newEvent = await _graphServiceClient
            .Users[userId]
            .Calendar
            .Events
            .Request()
            .AddAsync(CreateMeetingEvent());
        return newEvent.OnlineMeeting.JoinUrl;
    }

    private static Event CreateMeetingEvent() => new()
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
    };

}
