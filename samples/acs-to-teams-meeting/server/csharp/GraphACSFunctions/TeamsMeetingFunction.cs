using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Graph;
using Microsoft.Extensions.Configuration;
using GraphACSFunctions.Services;

namespace GraphACSFunctions;

public class TeamsMeetingFunction
{
    private readonly IGraphService _graphService;

    public TeamsMeetingFunction(IGraphService graphService) => _graphService = graphService;

    [FunctionName("TeamsMeetingFunction")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
        ILogger log) => 
        new OkObjectResult(await _graphService.CreateMeetingAsync());

}
