---
title: 4. Changing [...nextauth].ts file
sidebar_position: 1
---

We will need to make important changes to the `[...nextauth].ts` file so that we can authorize the user with some permissions related to Microsoft Graph.

To do this, we need to make the following changes:

- `pages/api/auth/[...nextauth].ts`:

<details><summary><b>api/auth/[...nextauth].ts</b></summary>
<br/>

```ts
/**
 * file: pages/api/auth/[...nextauth].ts
 * description: file responsible for the authenticate an user using AAD Provider
 * data: 10/28/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import NextAuth, { NextAuthOptions } from "next-auth";
import AzureADProvider from 'next-auth/providers/azure-ad';

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
      tenantId: process.env.AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          scope: 'openid profile email offline_access Presence.Read'
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the right token after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }

      return token;
    }
  }
}

export default NextAuth(authOptions);
```

</details>
<br/>

Let's understand what we included in this file:

- `clientId`: is the client ID you obtained when you registered your app in Azure Active Directory.
- `clientSecret`: is the client secret you obtained when you registered your app in Azure Active Directory.
- `tenantId` is the ID of the Azure Active Directory (tenant) directory you want to use to authenticate users.

In the `authorization` object, we are requesting the following permissions:

- `openid`: is a scope value that is required to request an ID token from Azure Active Directory.
- `profile`: is a scope value that is required to request the basic profile of a signed-in user from Azure Active Directory.
- `email`: is a scope value that is required to request the email address of a signed-in user from Azure Active Directory.
- `offline_access`: is a scope value that is required to request a refresh token from Azure Active Directory.
- `Presence.Read`: is a scope value that is required to request the presence of a signed-in user from Microsoft Graph.

And in the `callbacks` object, we are persisting the `access_token` and `refresh_token` to the right token after signin. This is necessary because the `access_token` and `refresh_token` are not persisted by default.

This will be the only one change we will make in this file. However, we need to make the `Client` from the Microsoft Graph SDK. But, let's make this change in the next session.