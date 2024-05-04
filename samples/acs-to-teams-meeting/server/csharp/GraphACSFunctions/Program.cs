using Azure.Communication.Identity;
using Azure.Identity;
using GraphACSFunctions.Services;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Graph;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureServices(services => {
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();
        services.AddSingleton(static p =>
        {
            var config = p.GetRequiredService<IConfiguration>();
            var clientSecretCredential = new ClientSecretCredential(
                config.GetValue<string>("TENANT_ID"),
                config.GetValue<string>("CLIENT_ID"),
                config.GetValue<string>("CLIENT_SECRET")
            );

            return new GraphServiceClient(
                clientSecretCredential,
                ["https://graph.microsoft.com/.default"]
            );
        });

        services.AddSingleton(static p =>
        {
            var config = p.GetRequiredService<IConfiguration>();
            var connectionString = config.GetValue<string>("ACS_CONNECTION_STRING");
            return new CommunicationIdentityClient(connectionString);
        });

        services.AddSingleton<IGraphService, GraphService>();
    })
    .Build();

host.Run();