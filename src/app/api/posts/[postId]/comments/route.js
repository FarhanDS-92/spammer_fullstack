import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function GET(request, response) {
  try {
    const { postId } = response.params;

    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
    });

    if (comments.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No comments in that post.",
      });
    }

    return NextResponse.json({ success: true, comments });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

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

    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({
        success: false,
        error: "You must provide a text to create a post.",
      });
    }

    const comment = await prisma.comment.create({ data: { text, postId } });

    return NextResponse.json({ success: true, comment });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
