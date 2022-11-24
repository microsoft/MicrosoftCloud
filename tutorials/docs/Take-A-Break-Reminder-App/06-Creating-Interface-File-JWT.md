---
title: Session 07 - Creating the Interface file for JWT
sidebar_position: 1
---

In the root of the project, create a file called `next-auth.d.ts` and include the following code:

- `next-auth.d.ts`

<details><summary><b>pages/reminder.tsx</b></summary>
<br/>

```tsx
import "next-auth/jwt"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
  interface JWT {
    userRole?: "admin",
    accessToken?: string,
    refreshToken?: string,
  }
}
```

</details>
<br />

Nothing very complicated here. But it is important that you understand what is happening here. The `next-auth/jwt` is a module that exports an interface called `JWT`. We are telling TypeScript that we want to extend this interface with the properties `userRole`, `accessToken` and `refreshToken`. This allows us to access these properties anywhere in our code. For example, if you try to access `session.userRole` somewhere in your code, TypeScript won't complain. This is very useful because you don't need to import the `session` everywhere. You can simply access the properties you need.

This means TypeScript Augmentation. You can read more about it **[AQUI](https://next-auth.js.org/getting-started/typescript#module-augmentation)**.

Finally we can test our application. Run the command `npm run dev` and access the application at `http://localhost:3000/reminder`. 

Make the login using the credentials you created in the previous step. If everything is ok, your name will be displayed on the screen.

Before to click in the `Start Timer` button, you will need to connect on Microsoft Teams. Remember that you will need to use the email that you created before in the M365 Developer Program.

Let your status as `Available`.

Return to the application and click in the `Start Timer` button. Wait for 2 minutes. After that, an alert message will pop up in your screen saying: `Take a break!`.

But if the user has a status differente from `Available`? What will happen? If you try to click in the `Start Timer`, it will inform you that you're `Offline` or `Busy` or any other status different from `Available`.

And, congratulations! You have created a simple application that uses the Microsoft Graph API to get the user status and the NextAuth to authenticate the user. 

Did you like this workshop? If you want to learn more about the Microsoft Graph API, in the next session I will let some important links for you to continue your studies.