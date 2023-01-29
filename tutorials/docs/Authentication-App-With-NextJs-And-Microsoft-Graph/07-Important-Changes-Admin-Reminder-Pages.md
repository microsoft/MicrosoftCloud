---
title: 7. Important changes in the Admin & Reminder Pages
sidebar_position: 1
---

Finally, let's make some changes in the `reminder.tsx` and `admin.tsx` files. So, let's add the following code:

- `pages/admin.tsx`

<details><summary><b>pages/admin.tsx</b></summary>
<br/>

```tsx
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
      <h2>Welcome, {session.user?.name}!</h2>
      <p>
        <strong>{content ?? '\u00a0'}</strong>
      </p>
      <br />
      <iframe src='/api/examples/session' />
    </Layout>
  );
}
```

</details>
<br/>

- `pages/reminder.tsx`

<details><summary><b>pages/reminder.tsx</b></summary>
<br/>

```tsx
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout/layout';

export default function ReminderPage() {
  const { data } = useSession();

  return (
    <Layout>
      <h1>Reminder Page</h1>
      <p>Only admin users can see this page.</p>
    </Layout>
  );
}
```

</details>
<br/>

Now, let's run the application and test it out. So, let's run the following command:

```bash
npm run dev
```

And finally let's open the browser and go to the following URL: `http://localhost:3000/`. So, you should see the following full application:

![gif-01](/img/authentication-workshop/gif-01.gif)

And finally, we finished the application! 🎉🎉🎉
