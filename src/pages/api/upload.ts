// src/pages/api/upload.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Status, Response } from "../../types/Request";
import { REST as Discord } from 'discord.js';
import { env } from "../../env/server.mjs";

interface Request extends NextApiRequest {
    query: {
        name: string;
        type: string;
    }
}

const supportedTypes = ['png', 'jpg', 'jpeg', 'gif', 'webp'];

export default async function handler(
    req: Request,
    res: NextApiResponse<Response<any, any>>
) {
    const { name, type } = req.query;

    if (!name || !type) {
        return res.status(400).json({
            success: Status.Error,
            error: "Invalid query"
        });
    }

    if (!supportedTypes.includes(type)) {
        return res.status(400).json({
            success: Status.Error,
            error: "Invalid type"
        });
    }
    
    const imageBase64 = req.body;
    const buff = Buffer.from(
      imageBase64.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const client = new Discord({ version: "10" }).setToken(env.DISCORD_TOKEN);

    try {
        const resp = await client.post(`/channels/${env.DISCORD_IMAGES_CHANNEL_ID}/messages`, {
            files: [{
                name: name + "." + type,
                data: buff,
                contentType: type
            }]
        })

        return res.status(200).json({
            success: Status.Success,
            data: resp
        })

    } catch (err) {
        return res.status(500).json({
            success: Status.Error,
            error: err
        })
    }


}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "8mb",
        },
    },
};