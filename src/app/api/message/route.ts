import { connectDB } from "@/lib/db";
import Chat from "@/models/Chat";
import Knowledge from "@/models/Knowledge";
import { NextResponse } from "next/server";

const generateTitle = (text: string) => {
  return text.length > 25 ? text.slice(0, 25) + "..." : text;
};

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { chatId, content, isFirstMessage } = body;

    console.log("Message Received:", content);

    if (isFirstMessage) {
      await Chat.findByIdAndUpdate(chatId, {
        title: generateTitle(content),
      });
    }

    const question = content.toLowerCase().trim();

    console.log("Searching For:", question);

    const allKnowledge = await Knowledge.find();

    console.log("Knowledge Records:", allKnowledge);

    const knowledge = await Knowledge.findOne({
      question: {
        $regex: question,
        $options: "i",
      },
    });

    console.log("Matched Record:", knowledge);

    return NextResponse.json({
      role: "assistant",
      content:
        knowledge?.answer ||
        "Sorry, I don't know the answer to that yet.",
    });
  } catch (error) {
    console.error("API Error:", error);

    return NextResponse.json({
      role: "assistant",
      content: "Something went wrong.",
    });
  }
}