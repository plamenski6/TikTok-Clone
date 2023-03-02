// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "../../../utils/client";
import { uuid } from "uuidv4";
import { postDetailQuery } from "../../../utils/queries";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id }: any = req.query;
    if (req.method === "GET") {
        const query = postDetailQuery(id);
        const data = await client.fetch(query);

        res.status(200).json(data[0]);
    } else if (req.method === "PUT") {
        const { comment, userId } = req.body;

        const data = await client
            .patch(id)
            .setIfMissing({ comments: [] })
            .insert("after", "comments[-1]", [
                {
                    comment,
                    _key: uuid(),
                    postedBy: { _type: "postedBy", _ref: userId },
                },
            ])
            .commit();

        res.status(200).json(data);
    }
}
