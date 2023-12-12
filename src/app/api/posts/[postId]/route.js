import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function PUT(request, response) {
  try {
    const { postId } = response.params;
    const { text } = await request.json();

    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        message: "No post with that ID found.",
      });
    }

    const updatedText = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        text: text,
      },
    });

    return NextResponse.json({
      success: true,
      posts: updatedText,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
