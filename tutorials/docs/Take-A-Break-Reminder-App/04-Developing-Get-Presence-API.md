---
title: 5. Developing the GetPresence API
sidebar_position: 1
---

In this session, we will develop the API that will return the user's presence status. To do this, we will use the Microsoft Graph `Client`.

But what is GetPresence API in the Microsoft Graph?

The GetPresence API is a Microsoft Graph API that allows you to get the presence status of a user. The presence status can be one of the following: `Available`, `AvailableIdle`, `Away`, `BeRightBack`, `Busy`, `BusyIdle`, `DoNotDisturb`, `Offline`, `PresenceUnknown`.     

> **Note:** if you want to know more User Presence API, please, check the following link: [User Presence API](https://learn.microsoft.com/en-us/graph/api/resources/presence?view=graph-rest-1.0)

If you want to see an example of this API, please, check the following link: [GetPresence](https://learn.microsoft.com/en-us/graph/api/presence-get?view=graph-rest-1.0&tabs=javascript).

To use this API, we need to install the `@microsoft/microsoft-graph-client` library. To do this, run the following command:

```bash
npm install @microsoft/microsoft-graph-client
```

Now, let's create a file called `getPresence.ts` in the `pages/api` folder and add the following code:

- `pages/api/getPresence.ts`:

<details><summary><b>pages/api/getPresence.ts</b></summary>
<br/>

```ts
/**
 * file: pages/api/getPresence.ts
 * description: file responsible for the getPresence Microsoft Graph API
 * data: 11/03/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { getToken, } from "next-auth/jwt";
import { Client } from "@microsoft/microsoft-graph-client";

import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({
    req,
  });

  const accessToken = token?.accessToken;

  if (accessToken) {
    const client = Client.init({
      authProvider: (done) => done(null, accessToken),
    });

    const userPresence = await client.api('/me/presence').get();

    res.status(200).json(userPresence);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
``` 

</details>
<br />

Let's understando what is happening in the code above. Firstly, we are importing the `getToken` and `Client` from the `next-auth/jwt` and `@microsoft/microsoft-graph-client` libraries, respectively. 

Then, we are creating a function called `handler` that will receive the `req` and `res` parameters. 

In this function, we are using the `getToken` method to get the `accessToken` from the `token` object. After that, we are using the `Client` to initialize the `client` object. 

Then, we are using the `client` object to call the `getPresence` API. Finally, we are returning the `userPresence` object to the client.

If everything is fine, the code will return status code `200` and the `userPresence` object. Otherwise, it will return status code `401` and the message `Unauthorized`.

This file will be very important for the application. Because it will be responsible for returning the user's presence status and also we will make a connection with the client-side in the application to the `reminder.tsx` file!

And it is we will need to make it. Some important changes in the `reminder.tsx` page. Let's go there?




