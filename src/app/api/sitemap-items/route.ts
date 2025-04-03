import { SitemapItem } from '@/lib/models/Sitemap';
import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    await connectToDatabase();
    const sitemapItems = await SitemapItem.find();
    return NextResponse.json(sitemapItems);
  } catch (error) {
    console.error('Error fetching sitemap items:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}