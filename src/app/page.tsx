"use client";
import BlogList from "@/components/BlogList";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
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

  return (
    <>
      <Header />
      {loading ? <Loader height={84} /> : <BlogList blogs={blogs}/>}
    </>
  );
}
