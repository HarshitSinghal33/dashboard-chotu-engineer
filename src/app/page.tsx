"use client";
import BlogList from "@/components/BlogList";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs'); // The API route you defined
        // if (!response.ok) {
        //   throw new Error('Failed to fetch blogs');
        // }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  console.log(blogs);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <BlogList blogs={blogs}/>
    </>
  );
}
