import Chat from "@/models/Chat";
import { NextResponse } from "next/server";


const generateTitle = (text: string) => {
  return text.length > 25 ? text.slice(0, 25) + "..." : text;
};

export async function POST(req: Request) {
  const body = await req.json();

  const { chatId, content, isFirstMessage } = body;
  if (isFirstMessage) {
    await Chat.findByIdAndUpdate(chatId, {
      title: generateTitle(content),
    });
  }

  const qa: Record<string, string> = {
    "what is ai":
      "AI is Artificial Intelligence that enables machines to simulate human intelligence.",
  };

  const question = content.toLowerCase().trim();

  const answer =
    qa[question] || "Sorry, I don't know the answer to that yet.";

  return Response.json({
    role: "assistant",
    content: answer,
  });
}