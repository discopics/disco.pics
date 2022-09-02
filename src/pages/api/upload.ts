// src/pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Status, Response } from "../../types/Request";
import { REST as Discord } from "discord.js";
import { env } from "../../env/server.mjs";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./auth/[...nextauth]";
import {
  checkIfSlugExists,
  createImage,
  verifyAndGetUser,
} from "../../lib/redis";
import { decipher } from "../../lib/hushh";

interface Request extends NextApiRequest {
  query: {
    name: string;
    type: string;
    domain: string;
    slug?: string;
  };
  headers: {
    auth?: string;
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
  const { name, type, domain } = req.query;
  const { auth } = req.headers;
  const session = await getServerSession(req, res, nextAuthOptions);

  if (!session && !auth && session === null) {
    return res.status(401).json({
      success: Status.Error,
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }

  let user = null;

  if (session) {
    user = session.user;
  } else if (auth) {
    const [id, n] = decipher(auth).split("-");
    if (!id || !n) {
      return res.status(401).json({
        success: Status.Error,
        error: "Invalid auth token.",
      });
    }

    const getUser = await verifyAndGetUser(id, parseInt(n));
    if (!getUser) {
      return res.status(401).json({
        success: Status.Error,
        error: "Invalid auth token.",
      });
    }
    user = getUser.toJSON();
  }

  console.log(user);

  if (!name || !type || !domain) {
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
  const randomlyGenerated3characterString = Math.random()
    .toString(36)
    .substring(2, 6);
  const slug = req.query.slug || `${randomlyGenerated3characterString}.${type}`;

  const exists = await checkIfSlugExists(slug, domain);

  if (exists) {
    return res.status(400).json({
      success: Status.Error,
      error: "Slug already exists",
    });
  }

  const client = new Discord({ version: "10" }).setToken(env.DISCORD_TOKEN);

  try {
    const resp = await client.post(
      `/channels/${env.DISCORD_IMAGES_CHANNEL_ID}/messages`,
      {
        files: [
          {
            name: name + "." + type,
            data: buff,
            contentType: type,
          },
        ],
      }
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resp["id"] = await createImage({
      uploaded_by: user.id,
      slug: slug,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      img_url: resp.attachments[0].url,
      uploaded_at: new Date(),
      domain: domain,
    });

    return res.status(200).json({
      success: Status.Success,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: { url: "https://" + domain + "/" + slug },
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
