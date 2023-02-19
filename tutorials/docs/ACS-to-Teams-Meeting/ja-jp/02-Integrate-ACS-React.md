---
title: 2. Integrate Azure Communication Services Calling into a React App
sidebar_position: 2
---

# Exercise 2

## React アプリに Azure Communication Services (ACS) の通話機能を組み込む

この演習では、[ACS UI 通話コンポジット](https://azure.github.io/communication-ui-library/?path=/docs/composites-call-joinexistingcall--join-existing-call) を React アプリに追加して、カスタム アプリから Microsoft Teams 会議への音声/ビデオ通話を行えるようにします。


![ACS in React](/img/acs-to-teams/2-acs-react.png "ACS in React")

1. https://github.com にアクセスしてサインインします。 (まだ GitHub アカウントを持っていない場合は `Sign up` からどうぞ。)

1. https://github.com/microsoft/MicrosoftCloud にアクセスしてください。

1. `Fork` を選択し、目的の GitHub 組織/アカウントに リポジトリを追加します。

    ![Fork a Repository](/img/acs-to-teams/fork-repo.png "Fork a Repository")

1. 次のコマンドを実行して、このリポジトリをマシンにクローンします。このとき、`<YOUR_ORG_NAME>` の部分を GitHub 組織/アカウント名に置き換えます。

    ```bash
    git clone https://github.com/<YOUR_ORG_NAME>/MicrosoftCloud
    ```

1. プロジェクトフォルダ `samples/acs-video-to-teams-meeting/client/react` を Visual Studio Code で開きます。

1. `package.json` ファイルを VS Code で開いてください。このとき、次の ACS パッケージが含まれていることに注意してください。

    ```
    @azure/communication-common 
    @azure/communication-react
    ``` 

1. ターミナルを開き、`npm 7` 以上がインストール済みであることを再確認しましょう。次のコマンドでチェックできます。

    ```bash
    npm --version
    ```

    :::tip
    
    もし `npm 7` 以上がインストールされていない場合は、`npm install -g npm` を実行して npm を最新バージョンに更新できます。

    :::

1. ターミナルウィンドウを開き、`react` フォルダで `npm install` コマンドを実行し、アプリケーションの依存関係をインストールします。

1. `App.tsx` を開き、ファイルの上部にあるインポートを確認してください。これらは、アプリで使用される ACS セキュリティとオーディオ/ビデオ通話シンボルのインポートを処理します。

    ```typescript
    import { 
        AzureCommunicationTokenCredential,
        CommunicationUserIdentifier 
    } from '@azure/communication-common';
    import {  
      CallComposite, 
      fromFlatCommunicationIdentifier, 
      useAzureCommunicationCallAdapter 
    } from '@azure/communication-react';
    import React, { useState, useMemo, useEffect } from 'react';
    import './App.css';
    ```

    :::note
    
    `CallComposite` コンポーネントがどのように使用されるかについては、この演習の後半で説明します。Azure Communication Services のコア UI 機能を提供して、アプリから Microsoft Teams 会議への音声/ビデオ通話を行うことができます。

    :::

1. `App` コンポーネントを見つけて、次のタスクを実行します。
    - コンポーネント内の `useState` の定義を確認してください。
    - `userId` `useState` 関数の空の引用符を、前の演習でコピーした ACS ユーザー ID 値に置き換えます。
    - `token` `useState` 関数の空の引用符を、前の演習でコピーした ACS トークン値に置き換えます。
    - `teamsMeetingLink` `useState` 関数の空の引用符を、前の演習でコピーした Teams ミーティング リンクの値に置き換えます。

    ```typescript
    // Replace '' with the ACS user identity value
    const [userId, setUserId] = useState<string>('');

    // Replace '' with the ACS token value
    const [token, setToken] = useState<string>('');

    // Replace '' with the Teams meeting link value
    const [teamsMeetingLink, setTeamsMeetingLink] = useState<string>('');
    ```

    :::note
    
    このチュートリアルの後半で、`userId`, `token`, `teamsMeetingLink` の値を動的に取得する方法を学びます。

    :::

1. `App` コンポーネントの中にある、`useMemo` 関数を見てみましょう。
    -  `credential` の `useMemo` 関数は、`token` の値が入っていると 新しい `AzureCommunicationTokenCredential` インスタンスを作成します。
    - `callAdapterArgs` `useMemo` 関数は、オーディオ/ビデオ通話をするときに使われる引数を持つオブジェクトを返します。`userId`, `credential`, `teamsMeetingLink` は ACS の通話系の機能で使われる値であることに注意してください。

    ```typescript
    const credential = useMemo(() => {
        if (token) {
            return new AzureCommunicationTokenCredential(token)
        }
        return;
    }, [token]);

    const callAdapterArgs = useMemo(() => {
        if (userId && credential && displayName && teamsMeetingLink) {
            return {
                userId: fromFlatCommunicationIdentifier(userId) as CommunicationUserIdentifier,
                displayName,
                credential,
                locator: { meetingLink: teamsMeetingLink },
            }
        }
        return {};
    }, [userId, credential, displayName, teamsMeetingLink]);
    ```

    :::note
    
    `useMemo` がこのシナリオで使われる理由としては、
    必要なパラメーターが渡されるときに `AzureCommunicationTokenCredential` オブジェクトと `callAdapterArgs` の作成を 1 回だけにするために使用されます。   
    (`useMemo` の詳細については [こちら](https://reactjs.org/docs/hooks-reference.html#usememo) をご参照ください。)
    
    :::

1. `credentials` と `callAdapterArgs` の準備が整ったら、以下のコードが、ACS によって提供されている `useAzureCommunicationCallAdapter` React フックを使った ACS call adapter の作成を処理します。この `callAdapter` オブジェクトは、後の コンポジット コンポーネントを呼び出す UI で使用されます。

    ```typescript
    const callAdapter = useAzureCommunicationCallAdapter(callAdapterArgs);
    ```

    :::note

    `useAzureCommunicationCallAdapter` は React フックであるため、 `callAdapterArgs` の値が有効になるまで `callAdapter` に値を割り当てません。
    
    :::

1. 以前、ユーザ ID, token, Teams meeting link を App コンポーネントの state 変数に割り当てましたね。今のところ問題なく動作しますが、後の演習で、これらの値を動的に取得する方法を学びます。次に示すように、`useEffect` 関数をコメントアウトしましょう。次の演習の Azure Functions を走らせたときに、またこのコードに戻ってくることになります。

    ```typescript
    useEffect(() => {
        /* Commenting out for now（今のところコメントアウト）
        const init = async () => {
            setMessage('Getting ACS user');
            //Call Azure Function to get the ACS user identity and token
            let res = await fetch(process.env.REACT_APP_ACS_USER_FUNCTION as string);
            let user = await res.json();
            setUserId(user.userId);
            setToken(user.token);

            setMessage('Getting Teams meeting link...');
            //Call Azure Function to get the meeting link
            res = await fetch(process.env.REACT_APP_TEAMS_MEETING_FUNCTION as string);
            let link = await res.text();
            setTeamsMeetingLink(link);
            setMessage('');
            console.log('Teams meeting link', link);
        }
        init();
        */
    }, []);
    ```

1. 次の JSX コードを見つけます。これは、`CallComposite` シンボルを使用して、React アプリから Teams ミーティングへの音声/ビデオ通話を行うために使用されるユーザー インターフェイスをレンダリングしています。前に調べた `callAdapter` が `adapter` プロパティに渡され、必要な引数が提供されます。

    ```jsx
    if (callAdapter) {
        return (
            <div>
                <h1>Contact Customer Service</h1>
                <div className="wrapper">
                    <CallComposite
                        adapter={callAdapter} 
                    />
                </div>
            </div>
        );
    }
    ```

1. 続行する前にファイルを保存します。

1. ターミナルウィンドウで `npm start` をたたき、アプリケーションを実行します。 （このとき、カレントディレクトリが `react` であることに注意しましょう。）

1. アプリケーションがビルドされると、web アプリが立ち上がり、通話 UI が表示されます。マイクとカメラの選択を有効にして、通話を開始すると、ロビーで待機中になります。以前 Teams でセットした会議に (Microsoft Teams アプリから) 参加すると、その待機中のゲストを会議に入れることができます。

1. `ctrl+c` を押してアプリを停止します。正常に実行できたので、ACS ユーザー ID とトークンを動的に取得し、Microsoft Teams 会議を自動的に作成し、Microsoft Graph を使用して参加 URL を返す方法を見てみましょう。
