import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";
import { SitemapItem } from "@/lib/models/Sitemap";

export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find();
    return NextResponse.json(blogs);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await verifyAuth(token);
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
  await connectToDatabase();
  const { title, slug, content, metaTitle, metaDescription, tags, published } =
    await req.json();

  const newBlog = new Blog({
    title,
    slug,
    content,
    metaTitle,
    metaDescription,
    tags,
    published,
    publishedAt: published ? new Date() : null,
  });

  try {
    await newBlog.save();
    if (published) {
      const newSitemapItem = new SitemapItem({ slug });
      await newSitemapItem.save();
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({
      message: errorMessage,
    });
  }

  return NextResponse.json({
    message: "Blog created successfully",
  });
}
