import { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User' // one user can create many prompts
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.']
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.']
  }
})

// Get the already existing prompt OR if it doesnt exist, create a new prompt based on the promptSchema
const Prompt = models.Prompt || model('Prompt', promptSchema);

export default Prompt;