import type { NextApiRequest, NextApiResponse } from "next";
import { searchRedis } from "../../lib/redis";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./auth/[...nextauth]";

interface Request extends NextApiRequest {
  query: {
    slug: string;
  };
}
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (!session) {
    res.send({
      success: 1,
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
  const { slug } = req.query;
  const images = await searchRedis(slug);
  res.send(images);
};
