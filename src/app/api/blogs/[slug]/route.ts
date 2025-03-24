import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";
import { NextResponse } from "next/server";

// Fetch a blog by slug
export async function GET(
  req: Request,
  { params }: any
) {
  await connectToDatabase();

  const blog = await Blog.findOne({ slug: params.slug }); // Fetch by slug

  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}

export async function PUT(req, { params }) {
  try {
    await connectToDatabase();

    if (!params?.slug) {
      return NextResponse.json({ error: "Slug parameter is required" }, { status: 400 });
    }

    const body = await req.json();
    const { title, content, metaTitle, metaDescription, tags, published } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug: params.slug },
      {
        title,
        content,
        metaTitle: metaTitle || "",
        metaDescription: metaDescription || "",
        tags: tags || [],
        published: Boolean(published),
        publishedAt: published ? new Date() : null,
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Delete a blog by slug
export async function DELETE(
  req: Request,
  { params }: any
) {
  await connectToDatabase();
  const deletedBlog = await Blog.findOneAndDelete({ slug: params.slug }); // Delete by slug

  if (!deletedBlog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Blog deleted" });
}