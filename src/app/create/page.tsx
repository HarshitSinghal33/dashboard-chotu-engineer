"use client";

import { useState } from "react";
import BackHeader from "@/components/BackHeader";
import RichTextEditor from "@/components/RichTextEditor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CreateBlogPage = () => {
  const [formState, setFormState] = useState({
    title: "",
    slug: "",
    imgUrl: "",
    metaTitle: "",
    metaDescription: "",
    tags: "",
    content: "",
    published: false
  });

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
      tags: formState.tags.split(",").map((tag) => tag.trim()),
      published: false,
    };

    console.log(blogData, "blog data");

    // const res = await fetch("/api/blogs", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(blogData),
    // });

    // const responseJson = await res.json();

    // console.log(responseJson);
    

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
          <Label htmlFor="imgUrl">imgUrl</Label>
          <Input
            id="imgUrl"
            value={formState.imgUrl}
            onChange={handleChange}
            placeholder="Enter blog Image Url"
          />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" value={formState.slug} placeholder="Slug" onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input id="metaTitle" value={formState.metaTitle} placeholder="metaTitle" onChange={handleChange} />
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
          <RichTextEditor
            value={formState.content}
            onChange={handleContentChange}
          />
        </div>

        <Button onClick={handleSubmit}>Create Blog</Button>
      </div>
    </>
  );
};

export default CreateBlogPage;
