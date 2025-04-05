"use client";
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

export default function BlogList({ blogs }: any) {
  const handleBlogDelete = async () => {};

  return (
    <div className="container mx-auto p-4">
      <Table className="border rounded-lg shadow-md overflow-hidden">
        <TableHeader>
          <TableRow className="bg-gray-100">
            {/* <TableHead className="w-24">Image</TableHead> */}
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Published</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogs.map((blog: any) => (
            <TableRow key={blog._id} className="hover:bg-gray-50 transition">
              {/* <TableCell>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="rounded-md object-cover"
                />
              </TableCell> */}
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.slug}</TableCell>
              <TableCell>{JSON.stringify(blog.published)}</TableCell>
              <TableCell>
                <Link href={`/update/${blog.slug}`} style={{marginRight: "12px"}}>
                  <Button variant="outline">Update</Button>
                </Link>
                <Button variant="outline">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
