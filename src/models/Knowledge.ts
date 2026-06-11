import mongoose from "mongoose";

const KnowledgeSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Knowledge ||
  mongoose.model("Knowledge", KnowledgeSchema);