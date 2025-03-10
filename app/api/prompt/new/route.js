import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();
    try {
        await connectToDatabase();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {
            status: 201
        });

    } catch (error) {
        return new Response("Failed to Create a New Prompt", {
            status: 500
        });
    }
}