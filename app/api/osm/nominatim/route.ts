import { NextResponse } from 'next/server';
import { SearchResponse } from '@/utils/types/osm/searchResponse.type';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('search_text')?.replace(/ /g, '+');
  if (!q) return [];

  try {
    const LIMIT = 5;
    const url = ` https://nominatim.openstreetmap.org/search?format=jsonv2&q=${q}&limit=${LIMIT}`;

    const response = await fetch(url);
    if (!response.ok) {
      console.error('Failed to fetch:', response.statusText);
      return [];
    }
    const data = await response.json();

    return NextResponse.json(
      data.map((item: SearchResponse) => ({
        place_id: item.place_id,
        longitude: item.lon, //経度
        latitude: item.lat, //緯度
        category: item.category,
        type: item.type,
        addresstype: item.addresstype,
        name: item.name,
        display_name: item.display_name,
      }))
    );
  } catch (error) {
    console.error('Error fetching:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
