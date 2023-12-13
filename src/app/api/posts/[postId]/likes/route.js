import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function POST(request, response) {
  try {
    const { postId } = response.params;

    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        error: "The id you provided for the post does not exist.",
      });
    }

    const likes = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: { increment: 1 },
      },
    });

    return NextResponse.json({ success: true, likes });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
