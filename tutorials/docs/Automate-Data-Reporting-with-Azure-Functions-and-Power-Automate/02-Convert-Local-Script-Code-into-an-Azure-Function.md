---
title: 2. Convert Local Script Code into an Azure Function
sidebar_position: 2
---

# Exercise 2

## Convert Local Script Code into an Azure Function

1. The code that you'll be adding to the Azure Function calls out to the GitHub API to retrieve clones, forks, and views data. A local version of the script can be <a href="https://github.com/DanWahlin/github-repo-stats/blob/main/getStats.js" target="_blank">found here</a>.

    :::note
    Although this tutorial relies on data returned from a <a href="https://docs.github.com/en/rest" target="_blank">GitHub API</a>, an Azure Function can return virtually any type of data related to your work tasks.
    :::

1. Run the following command to install the GitHub REST API SDK:

    ```
    npm install @octokit/rest
    ```

1. Open the `getGetHubRepoStats/index.ts` file in your editor and take a moment to explore the code.

    ```typescript
    import { AzureFunction, Context, HttpRequest } from "@azure/functions"

    const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
        context.log('HTTP trigger function processed a request.');
        const name = (req.query.name || (req.body && req.body.name));
        const responseMessage = name
            ? "Hello, " + name + ". This HTTP triggered function executed successfully."
            : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseMessage
        };

    };

    export default httpTrigger;
    ```

1. Create a new file in the  in the **getGitHubRepoStats** function folder named **getStats.ts**. Add the following code to the file.

    :::info
    If you hover over the code you can select the "copy" icon to copy the code to your clipboard.
    :::

    ```typescript
        import { Octokit } from '@octokit/rest';
        import { v4 as uuidv4 } from 'uuid';

        // Create personal access token (with repo --> public rights) at https://github.com/settings/tokens
        let octokit: Octokit;
        let ownersRepos;
        let context;

        export async function getStats(ctx) {
            context = ctx || { log: console.log };
            ownersRepos = getRepos();
            const stats = [];
            for (const repo of ownersRepos) {
                octokit = new Octokit({
                    auth: repo.token
                });
                const ownerRepo = {
                    owner: repo.owner,
                    repo: repo.repo
                }
                const clones = await getClones(ownerRepo);
                const forks = await getTotalForks(ownerRepo);
                const views = await getPageViews(ownerRepo);

                const yesterdayRow = getTodayRow(ownerRepo, clones, forks, views);
                stats.push(yesterdayRow);
            }

            return stats;
        }

        function getRepos() {
            try {
                const repos = JSON.parse(process.env['GITHUB_REPOS']);
                context.log('Repos:', repos);
                return repos;
            }
            catch (e) {
                context.log(e);
                return [];
            }
        }

        function getTodayRow(ownerRepo, clones, forks, views) {
            const today = new Date();
            const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
            .toISOString().split('T')[0] + 'T00:00:00Z';

            const todayClonesViewsForks ={
                id: uuidv4(),
                timestamp: yesterday,
                owner: ownerRepo.owner,
                repo: ownerRepo.repo,
                clones: 0,
                forks: forks,
                views: 0
            };
            const todayClones = clones.clones.find(c => c.timestamp === yesterday);
            const todayViews = views.views.find(v => v.timestamp === yesterday);
            if (todayClones) {
                todayClonesViewsForks.clones = todayClones.count;
            }
            if (todayViews) {
                todayClonesViewsForks.views = todayViews.count;
            }
            return todayClonesViewsForks;
        }

        async function getClones(ownerRepo) {
            try {
                // https://docs.github.com/en/rest/metrics/traffic#get-repository-clones
                const { data } = await octokit.rest.repos.getClones(ownerRepo);
                context.log(`${ownerRepo.owner}/${ownerRepo.repo} clones:`, data.count);
                return data;
            }
            catch (e) {
                context.log(`Unable to get clones for ${ownerRepo.owner}/${ownerRepo.repo}. You probably don't have push access.`);
            }
            return 0;
        }

        async function getTotalForks(ownerRepo) {
            try {
                // https://docs.github.com/en/rest/repos/forks
                const { data } = await octokit.rest.repos.get(ownerRepo);
                const forksCount = (data) ? data.forks_count : 0;
                context.log(`${ownerRepo.owner}/${ownerRepo.repo} forks:`, forksCount);
                return forksCount
            }
            catch (e) {
                context.log(e);
                context.log(`Unable to get forks for ${ownerRepo.owner}/${ownerRepo.repo}. You probably don't have push access.`);
            }
            return 0;
        }

        async function getPageViews(ownerRepo) {
            try {
                // https://docs.github.com/en/rest/metrics/traffic#get-page-views
                const { data } = await await octokit.rest.repos.getViews(ownerRepo);
                context.log(`${ownerRepo.owner}/${ownerRepo.repo} visits:`, data.count);
                return data;
            }
            catch (e) {
                context.log(`Unable to get page views for ${ownerRepo.owner}/${ownerRepo.repo}. You probably don't have push access.`);
                context.log(e);
            }
            return 0;
        }
    ```

1. Go back to the **getGitHubRepoStats/index.ts** file and modify it to look like the following. Notice that the code imports the `getStats` function you created previously. This keeps the function code nice and clean.

    ```typescript
    import { AzureFunction, Context, HttpRequest } from '@azure/functions';
    import { getStats } from './getStats';

    const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
        context.log('HTTP trigger function processed a GitHub repo stats request.');
        const stats = await getStats(context);
        context.log("The stats", stats);
        context.res = {
            body: stats
        };
    };

    export default httpTrigger;
    ```

1. Login to https://github.com.

1. Visit https://github.com/microsoft/MicrosoftCloud and select the `Fork` option. Select your GitHub user account/organization and the `MicrosoftCloud` repository will be added to your GitHub account. 

1. While at http://github.com, select your user icon in the upper-right of the screen followed by `Settings`. Perform the following steps:
    - Select `Developer settings` from the left menu.
    - Select `Personal access tokens`, `Tokens (classic)`.
    - Select the `Generate new token` button followed by `Generate new token (classic)`.
    - Give the token `Note` field a value of `github-api-test`.
    - In `Select scopes`, select the `public_repo` checkbox.
    - Select `Generate token` at the bottom of the screen.
    - Copy the token value to a local file. You'll need it in the next step.

1. Back in VS Code, open `local.settings.json` and add the following key/value pair into the `Values` section. Replace `<YOUR_GITHUB_USERNAME>` and `YOUR_GITHUB_TOKEN` with the appropriate values.

    ```
    "GITHUB_REPOS": "[ { \"owner\": \"<YOUR_GITHUB_USERNAME>\", \"repo\": \"MicrosoftCloud\", \"token\": \"<YOUR_GITHUB_TOKEN>\" }]"
    ```

    :::note
    Adding the **GITHUB_REPOS** value to `local.settings.json` will cause it pass the value as an environment variable to the function when you run it locally.
    :::

1. Open a terminal window in VS Code at the root of your project and select `func start`.

    :::info
    You may be prompted me to install the `core` tools.
    :::

1. After the function starts, you should see a URL value of **http://localhost:7071/api/getGitHubRepoStats** displayed in the console. 

1. Open a browser and navigate to **[http://localhost:7071/api/getGitHubRepoStats](http://localhost:7071/api/getGitHubRepoStats)**. If everything has been done correctly up to this point you should see stats returned for your **MicrosoftCloud** repo.

1. Stop the process running in the terminal window by selecting `ctrl + c`.
