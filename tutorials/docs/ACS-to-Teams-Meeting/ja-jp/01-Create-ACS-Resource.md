---
title: 1. Azure Communication Services のリソースの作成
sidebar_position: 1
---

# 演習 1

## Azure Communication Services のリソースの作成

この演習では、Azure ポータルで Azure Communication Services (ACS) のリソースを作成します。

![ACS in the Azure Portal](/img/acs-to-teams/1-acs-azure-portal.png "ACS in the Azure Portal")

はじめに、以下の作業を行います:

1. ブラウザーで https://portal.azure.com を開いて、サイン インを行います。

2. 画面上部の検索バーで `通信サービス` と入力して表示された 通信サービス` を選択します。

    ![ACS in the Azure Portal](/img/acs-to-teams/search-acs-portal.png "Azure Communication Services")

3. ツールバーにある `作成` を選択します。

4. 以下の手順を実行します:
    - サブスクリプションを選択。
    - 使用するリソース グループを選択 (そんざいしない場合は新しいものを作成)。
    - ACS のリソース名を入力。これは一意である必要があります。
    - データの場所を選択。

5. `レビューと作成` を選択して `作成` を選択します。

6. ACS のリソースが作成されたら、リソースに移動して `設定 --> ID およびユーザー アクセス トークン` を選択します。 

7. `音声およびビデオ通話 (VoIP)` のチェックボックスを選択します。

8. `生成` を選択します。

9. `ID` と `ユーザー アクセス トークン` をローカル ファイルにコピーします。後の演習で使用します。

    ![User identity and token](/img/acs-to-teams/user-identity-token.png "User identity and token")

10. `設定 --> キー` を選択して `主キー` の接続文字列を ID とユーザー アクセス トークンをコピーしたローカル ファイルにコピーします。

11. アプリケーションを実行するために Teams の会議リンクが必要になります。https://teams.microsoft.com に移動して、Microsoft 365 開発テナントにサインインして、左にあるカレンダーを選択します。

    :::tip
    
    もし、Microsoft 365 アカウントを持っていない場合は、[Microsoft 365 Developer Program](https://developer.microsoft.com/microsoft-365/dev-program) のサブスクリプションにサイン アップ出来ます。これは 90 日間無料で、開発目的で使用している限り継続的に更新出来ます。もし Visual Stduio *Enterprise* か *Professional* サブスクリプションをお持ちの場合、どちらのプログラムにも無料の Microsoft 365 [開発 サブスクリプション](https://aka.ms/MyVisualStudioBenefits) が含まれており、Visual Studio サブスクリプションの有効期間中は、このサブスクリプションが有効です。

    :::

12. カレンダーの任意の日時を選択して、ミーティングのタイトルと必須出席者を 1 名を追加して `送信` を選択します。

13. カレンダーに追加したミーティングを選択して表示された Teams ミーティング リンクをコピーして ACS の ID、ユーザー アクセス トークン、接続文字列を保存したファイルに保存します。

    ![Teams Meeting Join Link](/img/acs-to-teams/teams-meeting-link.png "Teams Meeting Join Link")

14. ACS のリソースの設定と Teams ミーティングへの参加リンクが準備できたので React アプリケーションを立ち上げてみましょう。
