import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req: any) => {
  const { userId, prompt, tag } = await req.json();

  try {
    // Its a lambda fn, so we need to connect to the db on each call
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    })

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 })
  }
}

