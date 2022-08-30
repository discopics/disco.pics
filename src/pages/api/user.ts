import type { NextApiRequest, NextApiResponse } from "next";
import { Status, Response } from "../../types/Request";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./auth/[...nextauth]";
import { createUser, getAllImagesByUser, getUser } from "../../lib/redis";
import { env } from "../../env/server.mjs";

type Request = NextApiRequest & {
  query: {
    images?: boolean;
    id?: string;
    key?: string; // So that dns.disco.pics can access the API
  };
};

export default async function handler(
  req: Request,
  res: NextApiResponse<Response<unknown, unknown>>
) {
  const session = await getServerSession(req, res, nextAuthOptions);

  const { id, key } = req.query;
  if (!session) {
    if (!id || !(key === env.GET_KEY)) {
      return res.status(401).json({
        success: Status.Error,
        error: "UNAUTHORIZED",
      });
    }
  }

  const userID = session?.user.id || id;

  if (!userID) {
    return res.status(400).json({
      success: Status.Error,
      error: "MISSING_USER_ID_OR_SESSION",
    });
  }

  try {
    let user = await getUser(userID);
    if (!user) {
      if (session) {
        user = await createUser({
          id: session.user.id,
          created_at: new Date().toISOString(),
          email: session.user.email,
          token_number: 0,
        });
      }
    }

    if (req.query.images == false) {
      return res.status(200).json({
        success: Status.Success,
        data: { user: user },
      });
    } else {
      const images = await getAllImagesByUser(userID);
      return res.status(200).json({
        success: Status.Success,
        data: { user: user, images: images },
      });
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json({
      success: Status.Error,
      error: err,
    });
  }
}
