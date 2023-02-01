---
title: 2. Installing dependencies from the Kit Get Started
sidebar_position: 1
---

Again, if you are not coming from the previous workshop, **[you can download the source code of the project we will be working on in this workshop](https://github.com/glaucia86/kitstarter-msgraph-nextjs)**

After downloading the source code, you should run the following command in the terminal:

```bash
cd kitstarter-msgraph-nextjs
```

```bash
npm install
```

At the root of the project, create a file called `env.local` and fill in the following environment variables:

```env
AZURE_AD_CLIENT_ID=<copy Application (client) ID here>
AZURE_AD_CLIENT_SECRET=<copy generated client secret value here>
AZURE_AD_TENANT_ID=<copy the tenant id here>
NEXTAUTH_SECRET= # Linux: `openssl rand -hex 32` or go to https://generate-secret.now.sh/32
```

And finally to run the project, run the following command:

```bash
npm run dev
```

Open your browser and go to the following address: `http://localhost:3000`

If everything is working correctly, we can move on to the next section.

