# Take a Break Reminder App

![Reminder App](/img/authentication-workshop/reminder.gif "Reminder App")

## Introduction

In this workshop, you will learn how to build a simple application with Next.js and Microsoft Graph that will send an alert to the user each 60 minutes, if the user status is set to `Available`. If so, the user will need to take a break.


## What Microsoft Graph is?

Microsoft Graph is an API that allows you to access data and services from Microsoft 365. You can use the Microsoft Graph API to build applications that interact with millions of users around the world, accessing data in a consistent way across the Microsoft 365 ecosystem.

## Prerequisites

To follow this workshop, you will need:

- **[Visual Studio Code](https://code.visualstudio.com/)**
- **[Microsoft Teams](https://www.microsoft.com/en-us/microsoft-teams/download-app?rtc=2)**
- **[Microsoft 365 Developer Program](https://developer.microsoft.com/en-us/microsoft-365/dev-program)**
- **[Microsoft Graph](https://developer.microsoft.com/en-us/graph)**
- **[Microsoft Graph JavaScript SDK](https://github.com/microsoftgraph/msgraph-sdk-javascript)**
- **[Node.js 16.x](https://nodejs.org/en/)**
- **[Next.js](https://nextjs.org/learn/foundations/about-nextjs)**

Beyond that, you will need a **[Microsoft 365 Developer Program account](https://developer.microsoft.com/en-us/microsoft-365/dev-program)**. 

If you have doubt how to create it, **[you can watch this video](https://www.youtube.com/watch?v=JvWLgirC8xs)**. It explains how to create the account. This account it's free. 

## Kit - Getting Started

If you not completed the previous workshop, **[you can download the kit from this link](https://github.com/glaucia86/kitstarter-msgraph-nextjs)**. This kit contains the code that you will need to complete this workshop. Thus, is not necessary to create the project from scratch.

## Sessions


| Session                                                     | Topics                                                                                                                                                                  |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Introduction**                                            | Here you will have an introduction to the workshop.                                                                                                                     |
| **1. Configuring an Application in Azure Active Directory** | Here you will learn how to create an application in AAD and configure the necessary permissions so that the application can access the user's data.                     |  |
| **2. Installing dependencies from the Kit Get Started**     | In this session we will install the dependencies from the kit get started.                                                                                              |
| **3. Changing [...nextauth].ts file**                       | In this session we will change the `nextauth.ts` file. This file is responsible for configuring the NextAuth.js library.                                                |
| **4. Developing the GetPresence API**                       | In this session we will be developing the `GetPresence` API. This API will be responsible for getting the presence of the user who is logged in.                        |
| **5. Important Changes in the Reminder Page**               | In this session, we will make some important changes in the `Reminder` page.                                                                                            |
| **6. Creating the Interface file for JWT**                  | In this session we will create an interface file for our application. This file will be responsible for configuring the JWT token that will be used in our application. |
| **7. Next Steps & Final Words**                             | And finally what is the next steps and some important links and resources.                                                                                              |
