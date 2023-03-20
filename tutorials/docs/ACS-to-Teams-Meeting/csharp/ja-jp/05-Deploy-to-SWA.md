---
title: 5. アプリを Azure Static Web Apps にデプロイする
sidebar_position: 5
---

# 演習 5

## アプリを Azure Static Web Apps にデプロイする

この演習では、Azure Static Web Apps を使用して ACS の React アプリと Azure Functions をクラウドにデプロイする方法を学習します。

![Azure Static Web Apps](/img/acs-to-teams/5-deploy-swa.png "Azure Static Web Apps")

1. https://portal.azure.com をブラウザで開いてサインインしてください。

2. 画面上部の検索バーに `static web apps` と入力して、表示された `静的 Web アプリ` を選択します。

    ![Azure Static Web Apps](/img/acs-to-teams/search-swa-portal.png "Azure Static Web Apps")

3. ツールバーの `作成` を選択します。

4. 以下のタスクを行ってください:
    - 自分のサブスクリプションを選択。
    - 使用するリソース グループを選択 (必要に応じて新規作成)。ACS に使用したものと同じリソースグループを使用も出来ます。
    - Azure Static Web Apps の名前に `acs-to-teams-meeting` と入力。
    - ホスティング プランで `Free` を選択。
    - リージョンを選択。

5. ラジオ ボタンで GitHub を選択して使用する GitHub アカウントでサインインをします。

6. サインインの後に、あなたの GitHub アカウントを選択してください:
    - 組織
    - リポジトリ (前のチュートリアルでフォークした `MicrosoftCloud` リポジトリ)
    - 分岐 (`main` を選択)

7. `ビルドの詳細` セクションで以下のタスクを行ってください:
    - ビルドのプリセット: `React`
    - アプリの場所: `/samples/acs-to-teams-meeting/client/react`
    - API の場所: `/samples/acs-to-teams-meeting/server/csharp`
    - 出力先: `build`

8. `確認および作成` を選択してください。

9.  詳細を確認して `作成` を選択してください。

10. 作成が完了したらリソースに移動して概要にある URL を確認してください。この演習の後半で必要になるので URL をファイルにコピーしてください。

11. Static Web Apps の `設定 --> 構成` を選択してください。

12. `+ 追加` ボタンを押して以下のキーと値を `アプリケーション設定` に追加してください。これらの値は Visual Studio の `GraphACSFunctions` プロジェクトの `local.settings.json` から取得してください。

    ```
    # これらの値を local.settings.json ファイルから取得
    TENANT_ID: <YOUR_VALUE>
    CLIENT_ID: <YOUR_VALUE>
    CLIENT_SECRET: <YOUR_VALUE>
    USER_ID: <YOUR_VALUE>
    ACS_CONNECTION_STRING: <YOUR_VALUE>
    ```

13. Azure ポータルの構成画面の上部にある `保存` ボタンを選択してください。

14. Azure Static Web App の構成が完了しました。GitHub リポジトリ (前にフォークしたもの) に戻って `.github/workflows` フォルダーにある `.yml` ファイルを確認してください。

15. GitHub リポジトリから pull して `.yml` ファイルを VS Code で開いて `###### End of Repository/Build Configurations ######` コメントの直後に以下の内容を追加します。その際に `<YOUR_AZURE_SWA_DOMAIN>` は、先ほど作成した Azure Static Web Apps の URL に置き換えてください。

    > 重要: `:env` が適切にインデントされていることを確認してください。これは上にある `:with` のインデントと一致させる必要があります。

    ```yaml
    env: # Add environment variables here
        REACT_APP_ACS_USER_FUNCTION: https://<YOUR_AZURE_SWA_DOMAIN>/api/ACSTokenFunction
        REACT_APP_TEAMS_MEETING_FUNCTION: https://<YOUR_AZURE_SWA_DOMAIN>/api/TeamsMeetingFunction
    ```

    :::info

    これにより React アプリのビルド プロセスに環境変数が渡され、ACS のユーザートークンや Teams 会議を作成する際に呼び出す API がわかるようになります。

    :::

16. `.yml` ファイルを保存し、変更を GitHub リポジトリにプッシュします。これにより、React アプリケーションの新しいビルドが開始され、Azure Static Web App にデプロイされます。

17. ビルド プロセスの完了後に Azure Static Web App の URL にアクセスすると、アプリケーションが動作していることが確認できます。

18. 以上で、このチュートリアルは完了です。
