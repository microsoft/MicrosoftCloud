---
title: 3. Microsoft Graph を使って動的に Microsoft Teams 会議を作成する
sidebar_position: 3
---

# 演習 3

## Microsoft Graph を使って動的に Microsoft Teams 会議を作成する

この演習では、Microsoft Graph と Azure Functions を使って自動的に Microsoft Teams 会議リンクを作成して ACS に渡します。

![Create Teams Meeting](/img/acs-to-teams/3-create-teams-meeting-link.png "Create Teams Meeting")

1. Azure Active Directory (AAD) にデーモン アプリ認証のためのアプリを作成します。ここでは 認証は `アプリの資格情報` と共にバックグラウンドで処理が行われ、AAD アプリは Microsoft Graph API の呼び出しをアプリケーションの許可で行います。Microsoft Graph を使用して、Microsoft Teams の会議を動的に作成し、Teams の会議 URL を返します。

2. 以下の手順で、 AAD アプリを作成します:
    1. [Azure Portal](https://portal.azure.com) を開いて、`Azure Active Directory` を選択。
    2. `アプリの登録` を選択して `新規登録` を選択。
    3. 以下のようにアプリケーションの登録フォームを入力し `登録` を選択:
        - 名前: *ACS Teams Interop App*
        - サポートされているアカウントの種類: *任意の組織ディレクトリ内のアカウント (任意の Azure AD ディレクトリ - マルチテナント) と個人の Microsoft アカウント (Skype、Xbox など)*
        - リダイレクト URI: 空欄のまま
    4. アプリの登録後に `API のアクセス許可` を選択して `+ アクセス許可の追加` を選択。
    5. `Microsoft Graph` を選択して `アプリケーションの許可` を選択。
    6. **Calendars.ReadWrite** を選択して `アクセス許可の追加` を選択。
    7. アクセス許可の追加後に、`<あなたのテナント名> に管理者の同意を与えます` を選択。
    8. `証明書とシークレット` に移動して `+ 新しいクライアント シークレット` を選択して `追加` を選択。
    9. 追加されたシークレットの値をコピーしてローカルのファイルにコピー。この演習の後ろで使用します。
    10. `概要` に移動して  `アプリケーション (クライアント) ID` と `ディレクトリ (テナント) ID` の値をコピーして、前の手順で使用したローカル ファイルにコピー。

3. `samples/acs-to-teams-meeting/server/csharp/ExerciseACS.sln` を Visual Studio 2022 で開いてください。

4. `ExerciseACS` プロジェクトに以下の内容で `local.settings.json` を追加してください:
    - `TENANT_ID` と `CLIENT_ID` と `CLIENT_SECRET` はローカル ファイルにコピーした値を使って更新してください。
    - `USER_ID` には Microsoft Teams 会議を作成したいユーザーの ID を指定します。

    :::note

    ユーザー ID は [Azure Portal](https://portal.azure.com) から取得できます。`Azure Active Directory` を選択してサイド バーの `ユーザー` を選択します。自分のユーザー名を検索して選択をしてユーザーの詳細を開きます。ユーザーの詳細にあるオブジェクト ID がユーザーの ID になります。`オブジェクト ID` をコピーして `local.settings.json` の `USER_ID` として使用してください。

    ![Getting User ID from Azure Active Directory](/img/acs-to-teams/aad-user-id.png "Getting User ID from Azure Active Directory")

    :::

    ```json
    {
        "IsEncrypted": false,
        "Values": {
            "FUNCTIONS_WORKER_RUNTIME": "node",
            "TENANT_ID": "",
            "CLIENT_ID": "",
            "CLIENT_SECRET": "",
            "USER_ID": "",
            "ACS_CONNECTION_STRING": ""
        },
        "Host": {
            "LocalHttpPort": 7071,
            "CORS": "*",
            "CORSCredentials": false
        },
        "watchDirectories": [
            "Shared"
        ]
    }
    ```
    :::note

    `ACS_CONNECTION_STRING` は次の演習で使用するため、ここでは更新を行いません。

    :::

5. ソリューション エクスプローラーで `ExerciseACS` プロジェクトをダブル クリックしてプロジェクト ファイルを開きます。以下の `PackageReference` タグで Microsoft Graph や認証のパッケージが含まれています:

    ```xml
    <PackageReference Include="Azure.Communication.Identity" Version="1.2.0" />
    <PackageReference Include="Azure.Identity" Version="1.8.2" />
    <PackageReference Include="Microsoft.Graph" Version="4.53.0" />
    ```

6. Open `Shared/graph.ts` and take a moment to expore the imports at the top of the file. This code handles importing authentication and client symbols that will be used in the Azure Function to call Microsoft Graph.

    ```typescript
    import {startDateTimeAsync, endDateTimeAsync} from './dateTimeFormat';
    import {ClientSecretCredential} from '@azure/identity';
    import {Client} from '@microsoft/microsoft-graph-client';
    import {TokenCredentialAuthenticationProvider} from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
    import 'isomorphic-fetch';
    ```

    :::info

    You'll also see imports from `dateTimeFormat.ts` which will be used later in this exercise. `startDateTimeAsync` and `endDateTimeAsync` will be used while creating a Microsoft Teams meeting link to define start date and end date for the meeting.

    ::: 

7.  Take a moment to examine `clientSecretCredential` and `appGraphClient`, they will be used later in the authentication process and when calling the Microsoft Graph API:

    ```typescript
    let clientSecretCredential;
    let appGraphClient;
    ```

8.  Locate the `ensureGraphForAppOnlyAuth` function:
    - `ClientSecretCredential` uses the `Tenant Id`, `Client Id` and `Client Secret` values from the Azure Active Directory app.
    - The `authProvider` object is defined as an Azure Active Directory app that will authenticate in the background and use app-only permissions (such as **Calendars.ReadWrite**) to make Microsoft Graph API calls.

    ```typescript
    function ensureGraphForAppOnlyAuth() {
        if (!clientSecretCredential) {
            clientSecretCredential = new ClientSecretCredential(
                process.env.TENANT_ID,
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET
            );
        }

        if (!appGraphClient) {
            const authProvider = new TokenCredentialAuthenticationProvider(
            clientSecretCredential, {
                scopes: [ 'https://graph.microsoft.com/.default' ]
            });

            appGraphClient = Client.initWithMiddleware({
                authProvider: authProvider
            });
        }
    }
    ``` 

9.  Take a moment to explore the `createNewMeetingAsync` function. It posts data to the [Microsoft Graph Calendar Events API](https://learn.microsoft.com/graph/api/calendar-post-events?view=graph-rest-1.0&tabs=http) which dynamically creates an event in a user's calendar and returns the new event details:

    ```typescript
    async function createNewMeetingAsync(userId) {
        ensureGraphForAppOnlyAuth();
        let startTime = await startDateTimeAsync();
        let endTime = await endDateTimeAsync();
        const newMeeting = `/users/${userId}/calendar/events`;
        
        const event = {
        subject: 'Customer Service Meeting',
        start: {
            dateTime: startTime,
            timeZone: 'UTC'
        },
        end: {
            dateTime: endTime,
            timeZone: 'UTC'
        },
        isOnlineMeeting: true
        };
        
        const newEvent = await appGraphClient.api(newMeeting).post(event);    
        return newEvent;     
    }

    export default createNewMeetingAsync;
    ```

10. Go to `TeamsMeetingFunction/index.ts` and explore the Http Trigger function:
    - `createNewMeetingAsync` is imported from `graph.ts`. It handles creating and retrieving new event details.
    - `userId` is retrieved from `local.settings.json` inside the Http Trigger function. This is done by accessing the `USER_ID` environment variable by using `process.env.USER_ID`.
    - When the function is triggered, it calls `createNewMeetingAsync` with the defined user id and returns the new event details in `teamMeetingLink` parameter.
    - The function accesses the Teams meeting join URL by calling `meeting.onlineMeeting.joinUrl` and returns the value in the body of the response.

    ```typescript
    import { AzureFunction, Context, HttpRequest } from "@azure/functions";
    import createNewMeetingAsync from '../Shared/graph';

    let teamsMeetingLink;

    const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest){
        context.log("Request received");
        const userId = process.env.USER_ID;
        context.log('UserId', userId);
        
        teamsMeetingLink = await createNewMeetingAsync(userId);
        const body = JSON.stringify(teamsMeetingLink);
        const meeting = JSON.parse(body);
        context.log("meeting:", meeting);
        
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: meeting.onlineMeeting.joinUrl
        }    
    };

    export default httpTrigger;
    ```

11. Use a terminal window to run `npm start` in the `samples/acs-video-to-teams-meeting/server/typescript` folder to run the function locally. 

12. Now that the `TeamsMeetingFunction` is ready to use, let's call the function from the React app.

13. Go back to the `samples/acs-to-teams-meeting/client/react` folder in VS Code. Add a `.env` file into the folder with the following values:

    ```
    REACT_APP_TEAMS_MEETING_FUNCTION=http://localhost:7071/api/TeamsMeetingFunction

    REACT_APP_ACS_USER_FUNCTION=http://localhost:7071/api/ACSTokenFunction
    ```

    :::info

        These values will be passed into React as it builds so that you can easily change them as needed during the build process.
    
    :::

14. Open `samples/acs-to-teams-meeting/client/react/App.tsx` file in VS Code.

15. Locate the `teamsMeetingLink` state variable in the component. Remove the hardcoded teams link and replace it with empty quotes:

    ```typescript
    const [teamsMeetingLink, setTeamsMeetingLink] = useState<string>('');
    ```

16. Locate the `useEffect` function and change it to look like the following. This handles calling the Azure Function you looked at earlier which creates a Teams meeting and returns the meeting join link:

    ```typescript
    useEffect(() => {
        const init = async () => {
            /* Commenting out for now
            setMessage('Getting ACS user');
            //Call Azure Function to get the ACS user identity and token
            let res = await fetch(process.env.REACT_APP_ACS_USER_FUNCTION as string);
            let user = await res.json();
            setUserId(user.userId);
            setToken(user.token);
            */
            
            setMessage('Getting Teams meeting link...');
            //Call Azure Function to get the meeting link
            res = await fetch(process.env.REACT_APP_TEAMS_MEETING_FUNCTION as string);
            let link = await res.text();
            setTeamsMeetingLink(link);
            setMessage('');
            console.log('Teams meeting link', link);

        }
        init();

    }, []);
    ```

17. Save the file before continuing.

18. Open another terminal window, `cd` into the `react` folder, and run `npm start` to build and run the application. 

19. After the application builds, you should see the ACS calling UI displayed and can then call into the Teams meeting that was dynamically created by Microsoft Graph.

20. Stop both of the terminal processes (React and Azure Functions) by entering `ctrl + c` in each terminal window.