import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";
import { NextResponse } from "next/server";

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

export async function POST(req: Request) {
  await connectToDatabase();
  const { title, slug, content, metaTitle, metaDescription, tags, published } =
    await req.json();

  const usedSlug = Boolean(slug)
    ? slug
    : title.toLowerCase().replace(/\s+/g, "-");

  const newBlog = new Blog({
    title,
    slug: usedSlug,
    content,
    metaTitle,
    metaDescription,
    tags,
    published,
    publishedAt: published ? new Date() : null,
  });

  try {
    await newBlog.save();
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({
      message: errorMessage
    });
  }

  return NextResponse.json({
    message: "Blog created successfully",
  });
}
