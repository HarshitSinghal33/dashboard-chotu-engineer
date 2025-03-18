"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const dummyData = [
  {
    id: 1,
    image: "/placeholder.jpg", // Replace with actual image path
    title: "Sample Product 1",
    slug: "sample-product-1",
  },
  {
    id: 2,
    image: "/placeholder.jpg",
    title: "Sample Product 2",
    slug: "sample-product-2",
  },
  {
    id: 3,
    image: "/placeholder.jpg",
    title: "Sample Product 3",
    slug: "sample-product-3",
  },
];

export default function BlogList({ blogs }) {
  return (
    <div className="container mx-auto p-4">
      <Table className="border rounded-lg shadow-md overflow-hidden">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-24">Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow key={blog._id} className="hover:bg-gray-50 transition">
              <TableCell>
                {/* <Image
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="rounded-md object-cover"
                /> */}
              </TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.slug}</TableCell>
              <TableCell className="text-right">
                <Link href={`/update/${blog.slug}`}>
                  <Button variant="outline">
                    Update
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
