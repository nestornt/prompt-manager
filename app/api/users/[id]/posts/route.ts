import { connectToDB } from "@utils/database";
import { NextRequest } from "next/server";
import Prompt from "@models/prompt";

export const GET = async (req: NextRequest, { params }: any) => {
  try {
    await connectToDB();
    
    const prompts = await Prompt.find({
      creator: params.id
    }).populate('creator');

    return new Response(JSON.stringify(prompts), {
      status: 200
    })
  } catch (error) {
    return new Response("Failed to fetch all prompts", {
      status: 500
    })
  }
}
