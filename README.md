# This project has been discontinued. Use at your own risk

---


# Disco.pics

Fast image hosting made easy.

![Main page](https://cdn.discordapp.com/attachments/1010857352645316658/1013573935088029809/image_2022-08-29_035052362.png)

![Embed builder](https://cdn.discordapp.com/attachments/1010857352645316658/1013568634314047628/1u118.gif)

# Overview video

Here's a short video that explains the project and how it uses Redis:

[Insert your own video here, and remove the one below]

[![Disco.pics](https://disco.pics/og-image.png)](https://www.youtube.com/watch?v=iprpEQD6liM)


## How it works

### How the data is stored

There are two different schemas, the `User` and `Image` schema.

For each user, this is the information that is stored:

- id: string
- email: string
- created_at: date
- token_number: number
- embed_title: string
- embed_site_name: string
- embed_site_url: string
- embed_colour: string
- embed_author_name: string
- embed_desc: string

here, the ID is indexed, so we can find users by their ID.

The `Image` schema is the information that is stored for each image:

- uploaded_by: string
- slug: string
- img_url: string
- uploaded_at: date

Here, `slug` and `uploaded_by` are indexed.

Whenever someone visits the `/[slug]` route, the `Image` schema is queried for the image with the slug.

Then, using the `uploaded_by`, embed information is queried from the `User` schema.


### How the data is accessed

All data is retrieved using `redis-om` package. The frontend makes requests through the `/api` routes. Then, the backend accesses functions from `lib/redis.ts` to add/retrieve the data.

## How to run it locally?

### Prerequisites

- Node - v16.14.0
- pnpm (7.3.0) / NPM

### Local installation

Clone the repository, install packages and enter the environment variables.

```bash
git clone https://github.com/discopics/disco.pics

pnpm i 
// or
npm i

pnpm dev
```

Environment variables:

All these environment variables are required to run the app.

```
NEXTAUTH_SECRET
NEXTAUTH_URL
# Next Auth Discord Provider
DISCORD_CLIENT_ID
DISCORD_CLIENT_SECRET
DISCORD_TOKEN
DISCORD_IMAGES_CHANNEL_ID
# Redis credentials
REDIS_URL
```

### Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/discopics/disco.pics)

## LICENSE

This project is licensed under the MIT license.


## More Information about Redis Stack

Here some resources to help you quickly get started using Redis Stack. If you still have questions, feel free to ask them in the [Redis Discord](https://discord.gg/redis) or on [Twitter](https://twitter.com/redisinc).

### Getting Started

1. Sign up for a [free Redis Cloud account using this link](https://redis.info/try-free-dev-to) and use the [Redis Stack database in the cloud](https://developer.redis.com/create/rediscloud).
1. Based on the language/framework you want to use, you will find the following client libraries:
    - [Redis OM .NET (C#)](https://github.com/redis/redis-om-dotnet)
        - Watch this [getting started video](https://www.youtube.com/watch?v=ZHPXKrJCYNA)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-dotnet/)
    - [Redis OM Node (JS)](https://github.com/redis/redis-om-node)
        - Watch this [getting started video](https://www.youtube.com/watch?v=KUfufrwpBkM)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-node/)
    - [Redis OM Python](https://github.com/redis/redis-om-python)
        - Watch this [getting started video](https://www.youtube.com/watch?v=PPT1FElAS84)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-python/)
    - [Redis OM Spring (Java)](https://github.com/redis/redis-om-spring)
        - Watch this [getting started video](https://www.youtube.com/watch?v=YhQX8pHy3hk)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-spring/)

The above videos and guides should be enough to get you started in your desired language/framework. From there you can expand and develop your app. Use the resources below to help guide you further:

1. [Developer Hub](https://redis.info/devhub) - The main developer page for Redis, where you can find information on building using Redis with sample projects, guides, and tutorials.
1. [Redis Stack getting started page](https://redis.io/docs/stack/) - Lists all the Redis Stack features. From there you can find relevant docs and tutorials for all the capabilities of Redis Stack.
1. [Redis Rediscover](https://redis.com/rediscover/) - Provides use-cases for Redis as well as real-world examples and educational material
1. [RedisInsight - Desktop GUI tool](https://redis.info/redisinsight) - Use this to connect to Redis to visually see the data. It also has a CLI inside it that lets you send Redis CLI commands. It also has a profiler so you can see commands that are run on your Redis instance in real-time
1. Youtube Videos
    - [Official Redis Youtube channel](https://redis.info/youtube)
    - [Redis Stack videos](https://www.youtube.com/watch?v=LaiQFZ5bXaM&list=PL83Wfqi-zYZFIQyTMUU6X7rPW2kVV-Ppb) - Help you get started modeling data, using Redis OM, and exploring Redis Stack
    - [Redis Stack Real-Time Stock App](https://www.youtube.com/watch?v=mUNFvyrsl8Q) from Ahmad Bazzi
    - [Build a Fullstack Next.js app](https://www.youtube.com/watch?v=DOIWQddRD5M) with Fireship.io
    - [Microservices with Redis Course](https://www.youtube.com/watch?v=Cy9fAvsXGZA) by Scalable Scripts on freeCodeCamp
