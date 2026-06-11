import { connectDB } from "@/lib/db";
import Chat from "@/models/Chat";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  const deletedChat = await Chat.findByIdAndDelete(id);

  if (!deletedChat) {
    return Response.json(
      { error: "Chat not found" },
      { status: 404 }
    );
  }

  return Response.json({
    success: true,
    message: "Chat deleted successfully",
  });
}