import mongoose, { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Please provide a prompt.'],
    },
    tag: {
        type: String,
        required: [true, 'Please provide a tag.'],
    },

});

const Prompt = models.Prompt || model('Prompt', promptSchema);

export default Prompt;