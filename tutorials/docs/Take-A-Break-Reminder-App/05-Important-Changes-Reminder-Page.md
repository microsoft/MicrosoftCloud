---
title: 5. Important Changes in the Reminder Page
sidebar_position: 1
---

Now that we have `getPresence` file, we need to update the `reminder.tsx` page to make the connection between the api with client-side in our application.

Open the `reminder.tsx` file and update the code as follows:

- `pages/reminder.tsx`:

<details><summary><b>pages/reminder.tsx</b></summary>
<br/>

```tsx
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Layout from '../components/Layout/layout';

export default function ReminderPage() {
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  const isPresent = async () => {
    const data = await fetch('/api/getPresence');
    const presence = await data.json();
    return !['Offline', 'Away'].includes(presence.availability);
  };

  const maybeAlert = async () => {
    if (await isPresent()) {
      alert('Take a Break!');
    }
  };

  const startTimer = async () => {
    if (!(await isPresent())) {
      alert('You are offline!');
      return;
    }

    // 60 minutes = 3600000 milliseconds
    // 2 minutes = 120000 milliseconds
    setTimeout(timerIsOver, 120000);

    setIsTimerStarted(true);
  };

  const timerIsOver = async () => {
    await maybeAlert();
    setIsTimerStarted(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h1>Reminder Page</h1>
      <h2>Welcome, {session?.user?.name}!</h2>

      <div>
        <h3>⏰ Time goes by... so slowly! ⏰</h3>
        {isTimerStarted ? (
          <p>
            {' '}
            <strong>Timer is running right now...</strong>
          </p>
        ) : (
          <button onClick={startTimer}>Start Timer!</button>
        )}
      </div>
    </Layout>
  );
}
```

</details>
<br />

Let's understand what we did in the code above. First, we imported the `useSession` hook from `next-auth/react` and the `useState` hook from `react`.

Then, we created some variables such as `isTimerStarted`, `setIsTimerStarted` and `isLoading`. All of them with initial status as `false`.

Now, let's understand each functions from this page:

- `isPresent` - This function is responsible for checking if the user is present or not on Microsoft Teams. It makes this requesting the API that we created in the previous step and then, will check if the value `availability` is different from `Offline` or `Away`. If it is, it will return `true` and if not, it will return `false`.

- `maybeAlert` - This function is responsible for checking if the user is present or not. If it is, it will show an alert message to the user.

- `startTimer` - This function will verify if the user is present (with status `Available`) on Microsoft Teams. If so, it will start the timer for 60 minutes (what is 3600000 milliseconds). For demonstration purposes, we will set the timer for 2 minutes (what is 120000 milliseconds).

- `timerIsOver`: This function will check if the user is present or not. If it is, it will show an alert message to the user. If not, it will set the `isTimerStarted` to `false`.

- `isLoading`: This variable is responsible for checking if the page is loading or not.

And in the `return` block code in the `ReminderPage` function, we will show the user's name and if the timer is running, it will show a message: `Timer is running right now...`. If not, it will show a button: `Start Timer`.

And that's it! Before to test it out our application, there's an important file that we need to create. Let's make it in the next session!