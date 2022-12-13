---
title: 1. Configuring an Application in Azure Active Directory
sidebar_position: 1
---

> **Note**: If you are coming from the previous workshop, you can skip this session.

In this session, you will learn how to create an application in Azure Active Directory (AAD) and configure the necessary permissions so that the application can access the user's data.

Before starting to develop the application, you need to create an application in the Azure Active Directory (AAD). For this, go now to the **[Azure Portal](https://portal.azure.com/)**, use your M365 Developer Program account and click on **Azure Active Directory**.

Now, let's go to the step by step!

## Step by Step

1. Go to **[Azure Portal](https://portal.azure.com/)** and click on **Azure Active Directory**.

![image-01](/img/authentication-workshop/image-01.png)

2. Click on **App Registrations**.

![image-02](/img/authentication-workshop/image-02.png)

3. Click on **New Registration**.

![image-03](/img/authentication-workshop/image-03.png)

4. Fill in the fields as shown below and click on **Register**.

![image-04](/img/authentication-workshop/image-04.png)

5. Go to **Overview** and copy:
   
- **Application (client) ID**
- **Directory (tenant) ID**

![image-05](/img/authentication-workshop/image-05.png)

> We will use these values to configure the application in the `env.local` file.

## Configure the Application

6. Go to **Certificates & secrets** and click on **New client secret**.

![image-06](/img/authentication-workshop/image-06.png)

7. Fill the field **Description** and click on **Add**.

![image-07](/img/authentication-workshop/image-07.png)

8. Copy the **Value** of the **Client secret**.

![image-08](/img/authentication-workshop/image-08.png)

> **Obs.:** don't forget to save this value, you will need it later. If you lose it, you will need to create a new one.

9. Go to **API permissions** and click on **Add a permission**.

![image-09](/img/authentication-workshop/image-09.png)

10. Click on **Microsoft Graph** amd then on **Delegated permissions**.

![image-101.png](/img/authentication-workshop/image-101.png)

11. Select the following permissions and click on **Add permissions**.

- **email**
- **offline_access**
- **openid**
- **Presence.Read**
- **profile**

![image-11](/img/authentication-workshop/image-11.png)

![image-12](/img/authentication-workshop/image-12.png)

12. Go to **Microsoft Graph** again and click on **Application permissions**.

![image-13](/img/authentication-workshop/image-13.png)

13. Select the following permissions and click on **Add permissions**.

- **Presence.ReadWrite.All**

![image-14](/img/authentication-workshop/image-14.png)

14. Click on **Grant admin consent for 'your-tenant-name'** and click on **Yes**.

![image-15](/img/authentication-workshop/image-15.png)

Congratulations! YEAH! 🎉🎉🎉

You have successfully created an application in Azure Active Directory and configured the necessary permissions so that the application can access the user's data.

Now, let's go to the next session!


