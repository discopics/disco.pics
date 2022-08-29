// src/pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Status, Response } from "../../types/Request";
import { REST as Discord } from "discord.js";
import { env } from "../../env/server.mjs";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./auth/[...nextauth]";
import { checkIfSlugExists, createImage } from "../../lib/redis";

interface Request extends NextApiRequest {
  query: {
    name: string;
    type: string;
    slug?: string;
  };
}

const supportedTypes = [
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "mp4",
  "webm",
  "mov",
];

export default async function handler(
  req: Request,
  res: NextApiResponse<Response<unknown, unknown>>
) {
  const { name, type } = req.query;

  const session = await getServerSession(req, res, nextAuthOptions);

  if (!session) {
    res.send({
      success: Status.Error,
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }

  if (!name || !type) {
    return res.status(400).json({
      success: Status.Error,
      error: "Invalid query",
    });
  }

  if (!supportedTypes.includes(type)) {
    return res.status(400).json({
      success: Status.Error,
      error: "Invalid type",
    });
  }

  const imageBase64 = req.body;
  const buff = Buffer.from(
    imageBase64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const client = new Discord({ version: "10" }).setToken(env.DISCORD_TOKEN);

  try {
    const resp = await client.post(
      `/channels/${env.DISCORD_IMAGES_CHANNEL_ID}/messages`,
      {
        body: {
          content: `Uploaded by ${session?.user.id} (${session?.user.name}#${session?.user.discriminator})`,
        },
        files: [
          {
            name: name + "." + type,
            data: buff,
            contentType: type,
          },
        ],
      }
    );

    if (session == null) {
      return res.status(500).json({
        success: Status.Error,
        error: "Session is null",
      });
    }

    const randomlyGenerated3characterString = Math.random()
      .toString(36)
      .substring(2, 5);
    const slug =
      req.query.slug ||
      `${session.user.name.slice(
        0,
        3
      )}-${randomlyGenerated3characterString}.${type}`;

    const exists = await checkIfSlugExists(slug);

    if (exists) {
      return res.status(400).json({
        success: Status.Error,
        error: "Slug already exists",
      });
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resp["id"] = await createImage({
      uploaded_by: session.user.id,
      slug: slug,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      img_url: resp.attachments[0].url,
      uploaded_at: new Date(),
    });

    return res.status(200).json({
      success: Status.Success,
      data: resp,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: Status.Error,
      error: err,
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb",
    },
  },
};
