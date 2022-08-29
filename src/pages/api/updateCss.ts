import type { NextApiRequest, NextApiResponse } from "next";
import { Status, Response } from "../../types/Request";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./auth/[...nextauth]";
import { updateUserCss } from "../../lib/redis";

type Request = NextApiRequest & {
  query: {
    css: string;
  };
};

export default async function handler(
  req: Request,
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

    const { css } = req.query;

    const response = updateUserCss(session.user.id, css);

    if (!response) {
      return res.status(400).json({
        success: Status.Error,
        error: "Could not update embed settings",
      });
    }

    return res.status(200).json({
      success: Status.Success,
      data: { user: response },
    });
  } catch (err) {
    return res.status(500).json({
      success: Status.Error,
      error: err,
    });
  }
}
