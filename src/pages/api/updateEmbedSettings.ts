import type { NextApiRequest, NextApiResponse } from "next";
import { Status, Response } from "../../types/Request";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./auth/[...nextauth]";
import { updateUserEmbedSettings } from "../../lib/redis";

type Request = NextApiRequest & {
  query: {
    embed_title: string;
    embed_site_name: string;
    embed_site_url: string;
    embed_colour: string;
    embed_author_name: string;
    embed_desc: string;
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

    const {
      embed_title,
      embed_site_name,
      embed_site_url,
      embed_colour,
      embed_author_name,
      embed_desc,
    } = req.query;

    const response = updateUserEmbedSettings(
      session.user.id,
      embed_title,
      embed_site_name,
      embed_site_url,
      embed_colour,
      embed_author_name,
      embed_desc
    );

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
