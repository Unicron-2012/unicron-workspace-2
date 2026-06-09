import { connectDB } from "@/lib/db";
import Chat from "@/models/Chat";

export async function POST() {
  await connectDB();

  const chat = await Chat.create({
    title: "New Chat",
    userId: "demo-user", // later we replace with auth
  });

  return Response.json(chat);
}
