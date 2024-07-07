import { NextResponse } from 'next/server';
import type { DiscoverItems } from '@/utils/here/geocodingResponse.type';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('search_text');
  if (!q) return [];

  try {
    const HERE_API_KEY = process.env.NEXT_PUBLIC_HERE_API_KEY;
    const LIMIT = 5;
    const url = `https://discover.search.hereapi.com/v1/discover?at=42.36346,-71.05444&limit=${LIMIT}&q=${q}&apiKey=${HERE_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error('Failed to fetch autocomplete suggestions:', response.statusText);
      return [];
    }
    const data = await response.json();

    return NextResponse.json(
      data.items.map((item: DiscoverItems) => ({
        title: item.title,
        id: item.id,
        longitude: item?.position?.lng, //緯度
        latitude: item?.position?.lat, //経度
        address: item.address,
        categories: item?.categories,
        foodTypes: item?.foodTypes,
        media: item?.media,
      }))
    );
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
