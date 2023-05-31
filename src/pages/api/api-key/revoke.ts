import withMethods from "@/lib/api-middlewares/with-methods";
import { authOptions } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { RevokeApiData } from "@/types/api";
import { db } from "@/lib/db";
import { z } from "zod";

const handler = async (req: NextApiRequest, res: NextApiResponse<RevokeApiData>) => {
    try {
        // get user info
        const user = await getServerSession(req, res, authOptions).then(
            async (res) => res?.user
        )

        // check if user is exists
        if (!user) {
            return res.status(401).json({
                error: 'Unauthorized',
                success: false
            })
        }

        // check if this user has apiKey that userId mathches the user from session
        const validApiKey = await db.apiKey.findFirst({
            where: {
                userId: user.id, enabled: true
            }
        })

        // if this user has no api key, return not found
        if (!validApiKey) {
            return res.status(500).json({
                error: 'This API key could not be invoked.',
                success: false
            })
        }


        // Revoke starts here
        // If user logged in and they want to revoke the api key
        // invalid API Key
        await db.apiKey.update({
            // make the "enabled" to false to invalidate
            where: { id: validApiKey.id },
            data: {
                enabled: false
            }
        })

        // Revoke successfully
        return res.status(200).json({ error: null, success: true })
    }
    catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(400).json({ error: err.issues, success: false })
        }

        return res.status(500).json({ error: 'Internal Server Error', success: false })
    }
    // P.S. the valid or current API Key that the user have will only have be enabled to "true"
}

export default withMethods(['POST'], handler)