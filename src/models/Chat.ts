import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    userId: String,

    title: {
      type: String,
      default: "New Chat",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Chat ||
  mongoose.model("Chat", ChatSchema);
