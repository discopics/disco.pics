import type { NextApiRequest, NextApiResponse } from "next";
import { getImage } from "../../lib/redis";

interface Request extends NextApiRequest {
  query: {
    slug: string;
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: Request, res: NextApiResponse) => {
  const { slug } = req.query;
  const image = await getImage(slug);
  if (!image) {
    res.status(404).end();
    return;
  }
  res.send(image);
};
