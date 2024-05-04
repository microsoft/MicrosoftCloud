
using System.Net;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;
using GraphACSFunctions.Services;

namespace GraphACSFunctions;

public class TeamsMeetingFunction
{
    private readonly IGraphService _graphService;

    public TeamsMeetingFunction(IGraphService graphService) => _graphService = graphService;

    [Function("HttpTriggerTeamsUrl")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequestData req,
        ILogger log)
    {
        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteStringAsync(await _graphService.CreateMeetingAsync());
        return response;
    }
}
