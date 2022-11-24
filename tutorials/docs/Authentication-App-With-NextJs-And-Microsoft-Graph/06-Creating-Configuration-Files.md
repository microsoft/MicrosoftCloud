---
title: Session 07 - Creating the Configuration Files
sidebar_position: 1
---

Now in the root of the project, let's create a file called `process.d.ts`. This file is responsible for adding the environment variables that we created previously. So, add the following code:

- `process.d.ts`

<details><summary><b>process.d.ts</b></summary>
<br/>

```tsx
/**
 * file: process.d.ts
 * description: file responsible for the types of the process
 * data: 11/01/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    AZURE_AD_CLIENT_SECRET: string;
    AZURE_AD_CLIENT_ID: string;
  }
}
``` 

</details>
<br/>

When in the project we have some protected routes/pages, we need to create a file called: `middleware.ts`. We just can access these protected routes/pages if we are authenticated. So, let's create this file and add the following code:

- `middleware.ts`

<details><summary><b>middleware.ts</b></summary>

```tsx
/**
 * file: middleware.ts
 * description: file responsible for the middleware protected
 *  pages/routes of the application
 * data: 11/01/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname === '/admin') {
        return token?.userRole === 'admin';
      }

      return !!token;
    },
  },
});

export const config = { matcher: ['/reminder'] };
```

</details>  
<br/>

Let's understand what is happening here. First, we are importing the `withAuth` function from the `next-auth/middleware` package. This function is responsible for protecting the routes/pages that we want. Then, we are exporting the `withAuth` function with the `callbacks` property. This property is responsible for checking if the user is authenticated or not. So, if the user is authenticated, we can access the protected pages. If the user is not an admin user, we can't access the `/admin` page. And if the user is not authenticated, we can't access the `/reminder` page. Just if it is logged in.

If you want to know more about the `middleware.ts` file, you can check the documentation of the `next-auth`: **[HERE](https://next-auth.js.org/configuration/nextjs#middleware)**.

We need to make some important changes in the `admin.tsx` file. So, let's add the following code:

- `pages/admin.tsx`

<details><summary><b>pages/admin.tsx</b></summary>
<br/>

```tsx
/**
 * file: pages/admin.tsx
 * description: file responsible for the admin page
 * data: 10/26/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout/layout';
import AccessDenied from '../components/AccessDenied/access-denied';

export default function Page() {
  const { data: session } = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/examples/admin-protected');
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };

    fetchData();
  }, [session]);

  if (!session) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Admin Page</h1>
      <p>
        <strong>{content ?? '\u00a0'}</strong>
      </p>
    </Layout>
  );
}
```

</details>
<br/>

Next step, inside the `api` folder let's create a folder called `examples`. And inside this folder, let's create a file called `admin-protected.ts`. So, add the following code:

- `api/examples/admin-protected.ts`

<details><summary><b>api/examples/admin-protected.ts</b></summary>
<br/>

```tsx
/**
 * file: pages/api/examples/admin-protected.ts
 * description: file responsible for the admin protected example
 * data: 11/01/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (session) {
    return res.send({
      content:
        "This is protected page. You can access this page because you are signed in.",
    })
  }

  res.send({
    error: "You must be signed in to view the protected page.",
  })
}
```

</details>
<br/>

And inside the `examples` folder, let's create a file called `session.ts`. So, add the following code:

* `api/examples/session.ts`

<details><summary><b>api/examples/session.ts</b></summary>
<br/>

```tsx
/**
 * file: pages/api/examples/session.ts
 * description: file responsible for the session example
 * data: 11/01/2022
 * author: Glaucia Lemos <Twitter: @glaucia_lemos86>
 */

import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  res.send(JSON.stringify(session, null, 2));
}
```

</details>
<br/>

Phew! We are almost done! However, there's some important changes that we need to do in the `Admin` and `Reminder` pages. Let's see this in the next session!
