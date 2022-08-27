import type { NextApiRequest, NextApiResponse } from "next";
import { Status, Response } from "../../types/Request";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./auth/[...nextauth]";
import { createUser, getAllImagesByUser, getUser } from "../../lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<unknown, unknown>>
) {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (!session) {
    res.send({
      success: Status.Error,
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }

  try {
    if (!session) {
      return res.status(400).json({
        success: Status.Error,
        error: "Session not found",
      });
    }

    let user = await getUser(session.user.id);
    if (!user) {
      user = await createUser({
        id: session.user.id,
        created_at: new Date().toISOString(),
        email: session.user.email,
        token_number: 0,
      });
    }

    const images = await getAllImagesByUser(session.user.id);

    return res.status(200).json({
      success: Status.Success,
      data: { user: user, images: images },
    });
  } catch (err) {
    return res.status(500).json({
      success: Status.Error,
      error: err,
    });
  }
}
