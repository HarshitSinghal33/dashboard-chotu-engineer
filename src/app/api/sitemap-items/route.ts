export const dynamic = "force-dynamic";

import { SitemapItem } from '@/lib/models/Sitemap';
import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    await connectToDatabase();
    const sitemapItems = await SitemapItem.find();
    return new NextResponse(JSON.stringify(sitemapItems), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Error fetching sitemap items:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}