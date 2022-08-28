# Disco.pics

Fast image hosting made easy.

![OGIMG](https://disco.pics/og-image.png)

![Main page](https://cdn.discordapp.com/attachments/1010857352645316658/1013573935088029809/image_2022-08-29_035052362.png)

![Embed builder](https://cdn.discordapp.com/attachments/1010857352645316658/1013568634314047628/1u118.gif)


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