using Azure.Communication.Identity;
using Azure.Identity;
using GraphACSFunctions;
using GraphACSFunctions.Services;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Graph;

[assembly: FunctionsStartup(typeof(Startup))]

namespace GraphACSFunctions;

public class Startup : FunctionsStartup
{
    public override void Configure(IFunctionsHostBuilder builder)
    {
        builder.Services.AddSingleton(static p =>
        {
            var config = p.GetRequiredService<IConfiguration>();
            var clientSecretCredential = new ClientSecretCredential(
                config.GetValue<string>("TENANT_ID"),
                config.GetValue<string>("CLIENT_ID"),
                config.GetValue<string>("CLIENT_SECRET")
            );

            return new GraphServiceClient(
                clientSecretCredential,
                new[] { "https://graph.microsoft.com/.default" }
            );
        });

        builder.Services.AddSingleton<IGraphService, GraphService>();

        builder.Services.AddSingleton(static p =>
        {
            var config = p.GetRequiredService<IConfiguration>();
            var connectionString = config.GetValue<string>("ACS_CONNECTION_STRING");
            return new CommunicationIdentityClient(connectionString);
        });
    }
}
