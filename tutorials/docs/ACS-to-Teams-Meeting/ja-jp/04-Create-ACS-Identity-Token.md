---
title: 4. Azure Communication Services の ID とトークンを動的に作成する
sidebar_position: 4
---

# 演習 4

## Azure Communication Services の ID とトークンを動的に作成する

この演習では、Azure Functions を使用して、Azure Communication Services からユーザー ID とトークンの値を動的に取得する方法について学習します。取得された値は、ACS の UI コンポジットに渡され、利用者による通話が可能になります。

![Create ACS Identity and Token](/img/acs-to-teams/4-acs-identity-token.png "Create ACS Identity and Token")

1. `local.settings.json` を開き、`ACS_CONNECTION_STRING` の値を、以前の演習で保存した ACS の接続文字列で更新します。

2. Visual Studio 2022 で `Startup.cs` を開いて `Configure` メソッド内の 2 つ目の `AddSingleton` の呼び出しを探してください。

3. ACS のユーザー ID やトークンの生成するために使用する `CommunicationIdentityClient` を `local.settings.json` の `ACS_CONNECTION_STRING` に設定した接続文字列を使って生成しています。

    ```csharp
    var config = p.GetRequiredService<IConfiguration>();
    var connectionString = config.GetValue<string>("ACS_CONNECTION_STRING");
    return new CommunicationIdentityClient(connectionString);
    ```

4. `ACSTokenFunction.cs` を開いて `ACSTokenFunction` クラスのコンストラクタとフィールドの定義を確認します。
   - トークンを取得する際に使用するスコープ (`CommunicationTokenScope.ViIP`) を static フィールドとして定義しています:
        ```csharp
        private static readonly CommunicationTokenScope[] Scopes = new[]
        {
            CommunicationTokenScope.VoIP,
        };
        ```
   - `Startup.cs` で設定した `CommunicationIdentityClient` のインスタンスをコンストラクタで受け取り関数の処理で使用するために `_tokenClient` フィールドに設定しています:
        ```csharp
        private readonly CommunicationIdentityClient _tokenClient;
        
        public ACSTokenFunction(CommunicationIdentityClient tokenClient)
        {
            _tokenClient = tokenClient;
        }
        ```

5. `Run` メソッドを開いて内容を確認します。`_tokenClient` の `CreateUserAsync` メソッドで ACS のユーザーを作成して、`GetTokenAsync` で作成したユーザーのビデオ通話 (`VoIP`) を行うためにアクセストークンを作成してレスポンスとして返しています。

    ```csharp
    [FunctionName("ACSTokenFunction")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
        ILogger log)
    {
        var user = await _tokenClient.CreateUserAsync();
        var userToken = await _tokenClient.GetTokenAsync(user, Scopes);
    
        return new OkObjectResult(new 
        { 
            userId = user.Value.Id, 
            userToken.Value.Token, 
            userToken.Value.ExpiresOn 
        });
    }
    ```

6. Visual Studio で `F5` キーを押すか、メニューの `デバッグ --> デバッグの開始` を選択してプログラムを実行します。

7. Azure Functions がローカルで実行されたので、クライアントでこれを呼び出すように変更します。

8.  `samples/acs-to-teams-meeting/client/react/App.tsx` ファイルを VS Code で開きます。

9.  `userId` と `token` ステート変数の定義をコンポーネント内で探してください。ハードコードされた値を空文字に置き換えます:

    ```typescript
    const [userId, setUserId] = useState<string>('');
    const [token, setToken] = useState<string>('');
    ```

10. `useEffect` の場所を探して、以下のように変更をして Azure Functions を呼び出して ACS のユーザー ID とトークンを取得するようにします: 

    ```typescript
    useEffect(() => {
        const init = async () => {
            setMessage('Getting ACS user');
            //Call Azure Function to get the ACS user identity and token
            let res = await fetch(process.env.REACT_APP_ACS_USER_FUNCTION as string);
            let user = await res.json();
            setUserId(user.userId);
            setToken(user.token);
            
            setMessage('Getting Teams meeting link...');
            //Call Azure Function to get the meeting link
            res = await fetch(process.env.REACT_APP_TEAMS_MEETING_FUNCTION as string); // Please remove let
            let link = await res.text();
            setTeamsMeetingLink(link);
            setMessage('');
            console.log('Teams meeting link', link);
        }
        init();

    }, []);
    ```

11. 先に進む前にファイルを保存します。

12. ターミナルで `react` フォルダーを開き `npm start` を実行します。ビルドが完了すると ACS の通話の画面が表示され Microsoft Graph で動的に作成された Teams の会議に参加することが出来ます。

13. ターミナル ウィンドウで `Ctrl + C` を押して React のアプリを終了させてください。そして Visual Studio で `Shift + F5` を押すかメニューの `デバッグ --> デバッグの停止` を選択してデバッグを終了させてください。

14. VS Code を使って git の変更をコミットし、GitHub リポジトリにプッシュします:
    - Git のアイコンを選択 (VS Code ツールバーの 3 番目のアイコン)。
    - コミット メッセージを入力して `Commit` を選択。
    - `Sync Changes` を選択。
