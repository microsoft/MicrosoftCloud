---
title: 5. Creating the pages for the application
sidebar_position: 1
---

Now, let's create the pages for the application. Open the `pages` folder and create the following files:

- `styles.css`
- `admin.tsx`
- `reminder.tsx`

And to improve the application's css a little bit more, let's add the following code in the `styles.css` file:

- `styles.css`

<details><summary><b>styles.css</b></summary>
<br/>

```css
body {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  padding: 0 1rem 1rem 1rem;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  background: #fff;
  color: #333;
}

li,
p {
  line-height: 1.5rem;
}

a {
  font-weight: 500;
}

hr {
  border: 1px solid #ddd;
}

iframe {
  background: #ccc;
  border: 1px solid #ccc;
  height: 10rem;
  width: 100%;
  border-radius: 0.5rem;
  filter: invert(1);
}
```

</details>
<br/>

Return to the `_app.tsx` file and let's add the style that we recently created. So import the 

- `pages/_app.tsx`

<details><summary><b>pages/_app.tsx</b></summary>
<br/>

```tsx
import './styles.css';

(... some code here ...)
```

</details>
<br/>

And also, create e folder called `styles` in the root of the project and create the file `Home.module.css` and add the following code:

- `styles/Home.module.css`

<details><summary><b>styles/Home.module.css</b></summary>
<br/>

```css
.container {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  margin: 5% 0;
  line-height: 1.15;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}
```

</details>
<br/>

I created an image to include in the home page. If you want to use it, you can get from the repository of this project inside the `public` folder. The images is called `authentication.gif`.

Now, let's create Admin page. Open the `pages/admin.tsx` file and add the following code:

- `pages/admin.tsx`

<details><summary><b>pages/admin.tsx</b></summary>
<br/>

```tsx
import { useSession } from 'next-auth/react';
import Layout from '../components/Layout/layout';

export default function Page() {
  const { data } = useSession();

  return (
    <Layout>
      <h1>Admin Page</h1>
      <p>Only admin users can see this page.</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  );
}
```

</details>
<br/>

And let's make the same thing with the `reminder.tsx` file:

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
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  );
}
```

</details>
<br/>

Now, let's make some important changes in the `index.tsx` file and add the following code:

* `pages/index.tsx`

<details><summary><b>pages/index.tsx</b></summary>
<br/>

```tsx
import Head from 'next/head';
import Layout from '../components/Layout/layout';
import Image from 'next/image';
import authenticationImage from '../public/images/authentication.gif';
import styles from '../styles/Home.module.css';

export default function IndexPage() {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Next.js | Microsoft Graph</title>
        </Head>
        <main className={styles.main}>
          <h1>Take a Break Reminder App</h1>
          <h4>
            A step by step tutorial how you can use Microsoft Graph with
            Next.js!
          </h4>
          <div>
            <Image
              priority={true}
              src={authenticationImage}
              width={560}
              height={315}
              alt='a clock image with a reminder'
            />
          </div>
        </main>
      </div>
    </Layout>
  );
}
```

</details>
<br/>

Wow! How many changes, right? 😅 Let's try to understand what is happening here. First, we are importing the `Head` component from the `next/head` package. This component is responsible for adding the title of the page. So, we are adding the title of the page as `Next.js | Microsoft Graph`. Then, we are importing the `Layout` component that we created previously. And also, we are importing the `Image` component from the `next/image` package. This component is responsible for adding the image in the home page. So, we are adding the image that we created previously. And finally, we are importing the `Home.module.css` file that we created previously.

Now run again the application and check the result:

![image-17](/img/authentication-workshop/image-17.jpg)

There's some important files that we need to create. But let's leave it for the next section. 😊