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


6. `Startup.cs` をいて `Configure` メソッドの先頭を確認します:
   - このコードは Microsoft Graph を Azure Functions から呼び出すための `GraphServiceClient` を作成しています。
   - `Tenant Id`, `Client Id`, `Client Secret` を指定して作成した `ClientSecretCredential` を `GraphServiceClient` のコンストラクタに渡すことでアプリケーションの権限 (**Calendars.ReadWrite** など) を使用して Microsoft Graph を呼び出すことが出来ます。

    ```csharp
    var config = p.GetRequiredService<IConfiguration>();
    var clientSecretCredential = new ClientSecretCredential(
        config.GetValue<string>("TENANT_ID"),
        config.GetValue<string>("CLIENT_ID"),
        config.GetValue<string>("CLIENT_SECRET")
    );
    
    return new GraphServiceClient(
        clientSecretCredential,
        new[] { "https://graph.microsoft.com/.default" }
    ```

7. `TeamsMeetingFunctions.cs` を開いてコンストラクタを確認します。`Startup.cs` で指定した `GraphServiceClient` を受け取って関数の処理で使用するためにフィールドに設定しています。`IConfiguration` は関数の処理で `local.settings.json` に設定した `USER_ID` を取得するために使用します。

    ```csharp
    private readonly GraphServiceClient _graphServiceClient;
    private readonly IConfiguration _configuration;
    
    public TeamsMeetingFunction(GraphServiceClient graphServiceClient, IConfiguration configuration)
    {
        _graphServiceClient = graphServiceClient;
        _configuration = configuration;
    }
    ```
    
8. `CreateMeetingEventAsync` メソッドを確認します:
   - [Microsoft Graph Calendar Events API](https://learn.microsoft.com/graph/api/calendar-post-events?view=graph-rest-1.0&tabs=http) にデータを送信して、引数の `userId` で渡された ID のユーザーのカレンダーに動的に新しいイベントを作成します。
   - 作成したイベントデータを返します。

    ```csharp
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
    ```

9. `Run` メソッドについて確認します:
   - コンストラクタでフィールドに設定した `_configuration` から `local.settings.json` の `USER_ID` を読み込み `CreateMeetingEventAsync` を呼び出してカレンダーに新しいイベントを作成しています。
   - イベントの Teams 会議リンクをレスポンスとして返しています。 

    ```csharp
    [FunctionName("TeamsMeetingFunction")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
        ILogger log)
    {
        var userId = _configuration.GetValue<string>("USER_ID");
        var newEvent = await CreateMeetingEventAsync(userId);
    
        return new OkObjectResult(newEvent.OnlineMeeting.JoinUrl);
    }
    ```
    
10. Visual Studio で `F5` キーを押すか、メニューの `デバッグ --> デバッグの開始` を選択してプログラムを実行します。

11. `TeamsMeetingFunction` が使用可能になったので、React アプリから呼び出して確認をしましょう。 

12. `samples/acs-to-teams-meeting/client/react` フォルダーを VS Code で開きます。そして `.env` ファイルを以下の値に変更します:

    ```
    REACT_APP_TEAMS_MEETING_FUNCTION=http://localhost:7071/api/TeamsMeetingFunction

    REACT_APP_ACS_USER_FUNCTION=http://localhost:7071/api/ACSTokenFunction
    ```

    :::info

        これらの値はビルド時に React に渡されるため、必要に応じてビルド プロセス中に必要に応じて簡単に変更することが出来ます。
    
    :::

13. `samples/acs-to-teams-meeting/client/react/App.tsx` ファイルを VS Code で開きます。

14. コンポーネント内の `teamsMeetingLink` の状態変数を探します。ハードコードされている Teams 会議リンクを空文字に置き換えます:
15. Locate the `teamsMeetingLink` state variable in the component. Remove the hardcoded teams link and replace it with empty quotes:

    ```typescript
    const [teamsMeetingLink, setTeamsMeetingLink] = useState<string>('');
    ```


16. `useEffect` 関数を探し、以下のように変更します。先ほど説明した Teams の会議を作成して会議の参加リンクを返す Azure Function の呼び出しを行います:

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
            let res = await fetch(process.env.REACT_APP_TEAMS_MEETING_FUNCTION as string); // Please add `let`.
            let link = await res.text();
            setTeamsMeetingLink(link);
            setMessage('');
            console.log('Teams meeting link', link);

        }
        init();

    }, []);
    ```

17. 先に進む前にファイルを保存します。

18. ターミナル ウィンドウで `react` フォルダーを開いて `npm start` を実行してアプリケーションを実行させてください。

19. アプリケーションがビルドされると、ACS の通話の画面が表示され、Microsoft Graph によって動的に作成された Teams の会議に参加できます。

20. ターミナル ウィンドウで `Ctrl + C` を押して React のアプリを終了させてください。そして Visual Studio で `Shift + F5` を押すかメニューの `デバッグ --> デバッグの停止` を選択してデバッグを終了させてください。
