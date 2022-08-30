import type { NextApiRequest, NextApiResponse } from "next";
import { Status, Response } from "../../types/Request";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./auth/[...nextauth]";
import { addUserDomain } from "../../lib/redis";

interface Request extends NextApiRequest {
  query: {
    domain: string;
  };
}

export default async function handler(
  req: Request,
  res: NextApiResponse<Response<unknown, unknown>>
) {
  const { domain } = req.query;

  const session = await getServerSession(req, res, nextAuthOptions);

  if (!session) {
    return res.status(401).json({
      success: Status.Error,
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }


  await addUserDomain(session.user.id, domain);

  return res.status(200).json({
    success: Status.Success,
    data: { success: true },
  });
}
