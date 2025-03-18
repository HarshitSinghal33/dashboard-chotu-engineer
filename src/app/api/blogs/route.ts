import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const blogs = await Blog.find({});
  return NextResponse.json(blogs);
}

export async function POST(req: Request) {
  await connectToDatabase();
  const { title, slug, content, metaTitle, metaDescription, tags, published } =
    await req.json();

  const usedSlug = Boolean(slug) ? slug : title.toLowerCase().replace(/\s+/g, "-");

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
    return NextResponse.json({
        message: "cannot saved",
        
      });
  }

  
  return NextResponse.json({
    message: "Blog created successfully",
    blog: newBlog,
  });
}
