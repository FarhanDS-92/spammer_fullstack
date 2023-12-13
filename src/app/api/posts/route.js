import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return NextResponse.json({ success: true, posts });
}

export async function POST(request, response) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({
        success: false,
        error: "You must provide a text to create a post.",
      });
    }

    const findText = await prisma.post.findFirst({ where: { text } });

    if (findText) {
      return NextResponse.json({
        success: false,
        error: "Must have a unique post.",
      });
    }

    const post = await prisma.post.create({ data: { text } });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
