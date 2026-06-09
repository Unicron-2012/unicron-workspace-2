import { connectDB } from "@/lib/db";
import Message from "@/models/Message";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ chatId: string }> }
) {
  await connectDB();

  const { chatId } = await context.params;

  const messages = await Message.find({
    chatId,
  }).sort({ createdAt: 1 });

  return Response.json(messages);
}
