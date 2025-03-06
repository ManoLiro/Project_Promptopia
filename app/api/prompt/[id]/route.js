import Prompt from "@models/prompt";
import { connectToDatabase } from "@utils/database";

//GET
export const GET = async (request, { params }) => {
    try {
        await connectToDatabase();

        const { id } = await params;

        const prompt = await Prompt.findById(id).populate('creator');
        if (!prompt) return new Response("Prompt not found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch prompt", { status: 500 });
    }
}

//PATCH (update)
export const PATCH = async (request, { params }) => {
    try {
        const { id } = await params;
        const { prompt, tag } = await request.json();

        await connectToDatabase();

        const existingPrompt = await Prompt.findById(id);
        if (!existingPrompt) return new Response("Prompt not found", { status: 404 });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 });
    }
}

//DELETE
export const DELETE = async (request, { params }) => {
    try {
        await connectToDatabase();

        const { id } = await params;

        const deletedPrompt = await Prompt.findByIdAndDelete(id);

        if (!deletedPrompt) return new Response("Prompt not found", { status: 404 });

        return new Response(JSON.stringify(deletedPrompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 });
    }
}