# MyBit-Transparency.tech
🔷 MyBit API Endpoint for our Basecamp projects server in our Transparency Portal

## Introduction

This repository is meant to be the source code for our official endpoint `https://hq-api.mybit.io`, which allows our
front end application to retrieve access to our Basecamp, where we coordinate all activities from MyBit AG.

## Setup

The project requires an authorised client account that can be used for interacting with the application. In our case,
we created a bot account that authenticates with [Datafire](https://github.com/DataFire/Integrations/tree/master/integrations/generated/basecamp)
in order to create an oauth token to be used within the application.

To get the token, run the following command:

```
npx datafire authenticate basecamp
```

Afterwards, provide the information related to the `client_id` and `client_secret` in order to trigger the Oauth2 workflow
from your local machine. This will save the credentials to a `DataFire-accounts.yml` which will be then passed to our `.env`
file with the following format:

```
CLIENT_ID=
CLIENT_SECRET=
ACCESS_TOKEN=
REFRESH_TOKEN=
ACCOUNT_ID=4144184
```

## Deployment

```
now --dotenv .env --name hq-api.mybit.io
```
