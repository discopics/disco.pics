import type { NextApiRequest, NextApiResponse } from "next";
import { createIndex } from "../../lib/redis";
import { env } from "../../env/server.mjs";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (env.NODE_ENV == "development") {
    await createIndex();
    res.status(200).json({ ok: true });
  }
  res.status(400).json({ ok: false });
};
