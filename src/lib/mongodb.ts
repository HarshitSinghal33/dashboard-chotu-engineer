import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = (global as any).mongooseCache || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "BlogDB",
        bufferCommands: false,
      })
      .then((mongoose) => mongoose)
      .catch((error) => {
        cached.promise = null;
        console.error("MongoDB connection error:", error);
        throw new Error("Database connection failed. Please try again later.");
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    throw error;
  }

  (global as any).mongooseCache = cached;
  return cached.conn;
}
