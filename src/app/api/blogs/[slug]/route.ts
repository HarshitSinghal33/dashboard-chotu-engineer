import { connectToDatabase } from "@/lib/mongodb";
import { Blog } from "@/lib/models/Blog";
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/auth";

// Fetch a blog by slug
export async function GET(
  req: Request,
  { params }: any
) {
  await connectToDatabase();
  await params;

  const blog = await Blog.findOne({ slug: params.slug }); // Fetch by slug

  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(blog);
}

export async function PUT(req: NextRequest, { params }: any) {
  const token = req.cookies.get('token')?.value;
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await verifyAuth(token);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  try {
    await connectToDatabase();
    await params;

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

    try {
      const blogAppUrl = 'https://www.chotuengineer.com';
      const revalidationResponse = await fetch(`${blogAppUrl}/api/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ path: `/blog/${params.slug}` }),
      });

      if (!revalidationResponse.ok) {
        console.error('Failed to revalidate blog page:', revalidationResponse.status, revalidationResponse.statusText);
      } else {
        console.log(`Blog page /blog/${params.slug} revalidated successfully.`);
      }
    } catch (revalidationError) {
      console.error('Error revalidating blog page:', revalidationError);
    }

    return NextResponse.json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Delete a blog by slug
export async function DELETE(
  req: NextRequest,
  { params }: any
) {
  const token = req.cookies.get('token')?.value;
  await params;
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await verifyAuth(token);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  await connectToDatabase();
  const deletedBlog = await Blog.findOneAndDelete({ slug: params.slug }); // Delete by slug

  if (!deletedBlog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Blog deleted" });
}