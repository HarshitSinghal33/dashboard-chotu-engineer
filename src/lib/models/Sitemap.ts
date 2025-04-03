// const mongoose = require('mongoose');
import mongoose, {Schema} from "mongoose";

const sitemapItemSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  lastmod: { type: Date, default: Date.now },
  priority: { type: Number, default: 0.8 },
  changefreq: { type: String, default: 'weekly' },
});

export const SitemapItem = mongoose.models.SitemapItem || mongoose.model("SitemapItem", sitemapItemSchema);