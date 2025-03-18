"use client";

import React, { use, useEffect, useState } from "react";
import BackHeader from "@/components/BackHeader";
import RichTextEditor from "@/components/RichTextEditor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
// import { useRouter } from "next/navigation";

const CreateBlogPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = use(params); // Access the `slug` from the route parameters
  // const router = useRouter();

  const [formState, setFormState] = useState({
    title: "",
    slug: "",
    imgUrl: "",
    metaTitle: "",
    metaDescription: "",
    tags: "",
    content: "",
    published: false,
  });

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`); // Fetch data using the `slug`
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        // Update the form state with the fetched data
        setFormState({
          title: data.title,
          slug: data.slug,
          imgUrl: "",
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          tags: data.tags.join(", "), // Convert tags array to a comma-separated string
          content: data.content,
          published: data.published,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [slug]); // Re-run the effect when the `slug` changes

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleContentChange = (value: string) => {
    setFormState((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async () => {
    const blogData = {
      ...formState,
      tags: formState.tags.split(",").map((tag) => tag.trim()), // Convert tags string back to an array
      published: formState.published,
    };

    console.log(blogData, "blog data");

    // Submit the updated data
    const res = await fetch(`/api/blogs/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });

    const responseJson = await res.json();
    console.log(responseJson);

    // if (res.ok) {
    //   router.push("/blogs"); // Redirect after success
    // }
  };

  return (
    <>
      <BackHeader />
      <div className="container mx-auto p-6 space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formState.title}
            onChange={handleChange}
            placeholder="Enter blog title"
          />
        </div>

        <div>
          <Label htmlFor="imgUrl">Image URL</Label>
          <Input
            id="imgUrl"
            value={formState.imgUrl}
            onChange={handleChange}
            placeholder="Enter blog Image URL"
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={formState.slug}
            onChange={handleChange}
            placeholder="Slug"
            disabled // Disable slug editing if needed
          />
        </div>

        <div>
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input
            id="metaTitle"
            value={formState.metaTitle}
            onChange={handleChange}
            placeholder="Meta Title"
          />
        </div>

        <div>
          <Label htmlFor="published">Published</Label>
          <Switch
            id="published"
            checked={formState.published}
            onCheckedChange={(val) =>
              setFormState((prev) => ({ ...prev, published: val }))
            }
          />
        </div>

        <div>
          <Label htmlFor="metaDescription">Meta Description</Label>
          <Textarea
            id="metaDescription"
            value={formState.metaDescription}
            onChange={handleChange}
            placeholder="Enter meta description"
          />
        </div>

        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            value={formState.tags}
            onChange={handleChange}
            placeholder="e.g. react, nextjs, mongodb"
          />
        </div>

        <div>
          <Label>Content</Label>
          {formState.content && (
            <RichTextEditor
              value={formState.content}
              onChange={handleContentChange}
            />
          )}
        </div>

        <Button onClick={handleSubmit}>Update Blog</Button>
      </div>
    </>
  );
};

export default CreateBlogPage;
