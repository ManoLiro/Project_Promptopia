import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

export const GET = async (request, { params }) => {
    try {

        await connectToDatabase()

        const { id } = await params;

        const prompts = await Prompt.find({
            creator: id
        }).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200 })

    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 