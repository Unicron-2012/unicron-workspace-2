import { connectDB } from "@/lib/db";
import Message from "@/models/Message";

export async function POST(req: Request) {
  try {
    console.log("MESSAGE API HIT");

    await connectDB();

    const body = await req.json();

    console.log("BODY:", body);

    const message = await Message.create({
      chatId: body.chatId,
      role: body.role,
      content: body.content,
    });

    console.log("SAVED:", message);

    return Response.json(message);
  } catch (error) {
    console.error("MESSAGE ERROR:", error);

    return Response.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}
