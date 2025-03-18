import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  tags?: string[];
  author: string;
  published?: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Blog schema
const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

// Ensure unique slug generation
BlogSchema.pre("save", function (next) {
  this.slug = this.slug.toLowerCase().replace(/\s+/g, "-");
  next();
});

// Prevent model re-registration
export const Blog = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
