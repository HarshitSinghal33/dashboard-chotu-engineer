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
  return (
    <div className="container mx-auto p-4">
      <Table className="border rounded-lg shadow-md overflow-hidden">
        <TableHeader>
          <TableRow className="bg-gray-100">
            {/* <TableHead className="w-24">Image</TableHead> */}
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="text-right">Action</TableHead>
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
