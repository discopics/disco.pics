import type { NextApiRequest, NextApiResponse } from "next";
import { Status, Response } from "../../types/Request";
import prettier from 'prettier';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response<unknown, unknown>>
) {

  if (req.method !== "POST") {
    return res.status(400).json({
      success: Status.Error,
      error: "Method not allowed",
    });
  }

  try {
    
    const css = req.body;

    const response = prettier.format(css, { parser: "css" });

    if (!response) {
      return res.status(400).json({
        success: Status.Error,
        error: "Could not format your CSS",
      });
    }

    return res.status(200).json({
      success: Status.Success,
      data: response,
    });
  } catch (err) {
    return res.status(500).json({
      success: Status.Error,
      error: err,
    });
  }
}
