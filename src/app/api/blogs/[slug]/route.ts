import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";
import { NextResponse } from "next/server";

// Fetch a blog by slug
export async function GET(
  req: Request,
  { params }: any
) {
  await connectToDatabase();
  console.log(params);

  const blog = await Blog.findOne({ slug: params.slug }); // Fetch by slug

  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}

// Update a blog by slug
export async function PUT(
  req: Request,
  { params }: any
) {
  await connectToDatabase();
  const { title, content, metaTitle, metaDescription, tags, published } =
    await req.json();

  const updatedBlog = await Blog.findOneAndUpdate(
    { slug: params.slug }, // Update by slug
    {
      title,
      slug: title.toLowerCase().replace(/\s+/g, "-"), // Regenerate slug if title changes
      content,
      metaTitle,
      metaDescription,
      tags,
      published,
      publishedAt: published ? new Date() : null,
    },
    { new: true }
  );

  if (!updatedBlog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Blog updated", blog: updatedBlog });
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