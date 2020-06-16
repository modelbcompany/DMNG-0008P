# Deployment

Below you'll find instructions on how to deploy to Vercel and WordPress Engine.

## Overview

[Prerequisites](#prerequisites)  
[Vercel](#vercel)  
[WordPress Engine](#wordpress-engine)

## Prerequisites

1. **Review the [Contributing Guide](CONTRIBUTING.md)**

## Vercel

### Environment Variables

From the Vercel docs:

> Environment Variables are accessible during both Build Step and Runtime, and
> can be configured for Production, Preview, and Development Environments
> individually.
>
> To declare an Environment Variable for your deployment, head to the General
> page of your Project Settings and locate the Environment Variables section.

Reference: [Build Step: Environment Variables][1]

[1]: https://vercel.com/docs/v2/build-step#environment-variables

### Deployment Types

Reference: <https://vercel.com/docs/v2/platform/deployments#deployment-types>

#### Preview Deployment URLs

> Preview deployments are the default for all deployments. Each time you push to
> a branch or make a deployment using the `vercel` command, this is a **preview
> deployment**.
>
> By making a **preview deployment**, the **preview URL** will be updated to
> reflect that of the latest deployment made.
>
> The **preview URL** is provided on a pull or merge request when using a
> [Vercel for Git Integration](https://vercel.com/docs/v2/git-integrations) and
> contains the name of the user or team to which the Project belongs.

#### Production

> Each time you merge to the default branch (commonly master) or make a
> deployment using the `now --prod` command, this is a production deployment.
>
> By making a **production deployment**, the **production domain(s)** will be
> updated to reflect that of the latest deployment.
>
> The **production domain(s)** are defined from the **Domains** tab of a Project
> on the Vercel Dashboard.

## WordPress Engine

1. Open the Local app.

1. In the bottom right corner, find the "Push to WPEngine" button.

1. Choose the environment you'd like to push to.
