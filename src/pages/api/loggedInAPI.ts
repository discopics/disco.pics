import type { NextApiRequest, NextApiResponse } from "next";
import { Status, Response } from "../../types/Request";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./auth/[...nextauth]";
import {
  getCurrentUserToken,
  reGenerateUserToken,
  verifyAndGetUser,
} from "../../lib/redis";
import { decipher } from "../../lib/hushh";

type Request = NextApiRequest & {
  query: {
    currentToken?: string;
  };
};

export default async function handler(
  req: Request,
  res: NextApiResponse<Response<unknown, unknown>>
) {
  const session = await getServerSession(req, res, nextAuthOptions);
  const { currentToken } = req.query;

  if (!session) {
    return res.status(401).json({
      success: Status.Error,
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }

  const { user } = session;
  if (req.method == "GET") {
    const token = await getCurrentUserToken(user.id);
    return res.status(200).json({
      success: Status.Success,
      data: { token },
    });
  }

  if (req.method == "DELETE") {
    if (!currentToken) {
      return res.status(400).json({
        success: Status.Error,
        error:
          "You need to send the currentToken in order to regenerate a new one",
      });
    }

    const [id, n] = decipher(currentToken).split("-");
    if (!id || !n || id != session.user.id) {
      return res.status(401).json({
        success: Status.Error,
        error: "Invalid auth token.",
      });
    }

    const verify = await verifyAndGetUser(id, parseInt(n));
    if (!verify) {
      return res.status(401).json({
        success: Status.Error,
        error: "Invalid auth token.",
      });
    }

    const token = await reGenerateUserToken(user.id);
    return res.status(200).json({
      success: Status.Success,
      data: { token },
    });
  }

  return res.status(500).json({
    success: Status.Error,
    error: "Something went wrong",
  });
}
