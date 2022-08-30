import type { NextApiRequest, NextApiResponse } from "next";
import { Status, Response } from "../../types/Request";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./auth/[...nextauth]";
import { addUserDomain, deleteUserDomain, getUser } from "../../lib/redis";
import { env } from "../../env/server.mjs";
import dns from "dns";

interface Request extends NextApiRequest {
  query: {
    domain: string;
    verification: string;
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

  const user = await getUser(session.user.id);
  if (user?.toJSON().domains.length >= 1) {
    return res.status(400).json({
      success: Status.Error,
      error: "DOMAIN_LIMIT_REACHED",
    });
  }

  if (req.method == "DELETE") {
    const rDelete = await deleteUserDomain(session.user.id, domain);

    if (rDelete === "DOMAIN_NOT_FOUND") {
      return res.status(404).json({
        success: Status.Error,
        error: "DOMAIN_NOT_FOUND",
      });
    }

    const r = await fetch(
      `https://api.vercel.com/v9/projects/${env.VERCEL_PROJECT_ID}/domains/${domain}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${env.VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (r.status == 200) {
      return res.status(200).json({
        success: Status.Success,
        data: {
          domain: "deleted",
        },
      });
    } else {
      return res.status(500).json({
        success: Status.Error,
        error: "VERCEL_ERROR",
      });
    }
  }

  const topDomain = domain.split(".").slice(-2).join(".");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await new Promise((resolve, reject) => {
    dns.resolveTxt("_disco." + topDomain, (err, records) => {
      if (err) {
        reject(err);
      } else {
        resolve(records);
      }
    });
  });

  if (!result || !result[0] || result[0][0] !== req.query.verification) {
    // Throw error
    return res.status(400).json({
      success: Status.Error,
      error: "CNAME_ERROR",
    });
  }

  const e = await addUserDomain(session.user.id, domain);
  if (e == "DOMAIN_ALREADY_EXISTS") {
    return res.status(400).json({
      success: Status.Error,
      error: "DOMAIN_ALREADY_EXISTS",
    });
  }

  const r = await fetch(
    `https://api.vercel.com/v9/projects/${env.VERCEL_PROJECT_ID}/domains`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.VERCEL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: domain,
      }),
    }
  );

  if (r.status !== 200) {
    return res.status(500).json({
      success: Status.Error,
      error: "Error adding domain",
    });
  } else {
    return res.status(200).json({
      success: Status.Success,
      data: { success: true },
    });
  }
}
