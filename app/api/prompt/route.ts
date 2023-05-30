import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { NextApiRequest } from "next";

export const GET = async (req: NextApiRequest) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate('creator');

    return new Response(JSON.stringify(prompts), {
      status: 200
    })
  } catch (error) {
    return new Response("Failed to fetch all prompts", {
      status: 500
    })
  }
}

