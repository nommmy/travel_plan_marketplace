import { NextResponse } from 'next/server';
import { IGeocoderFeature } from '@/utils/mapbox/geocodingResponse.type';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('search_text');
  if (!q) return [];

  try {
    const MAPBOX_API_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const LIMIT = 5;
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json?limit=${LIMIT}&access_token=${MAPBOX_API_TOKEN}`;

    const response = await fetch(url);
    if (!response.ok) {
      console.error('Failed to fetch autocomplete suggestions:', response.statusText);
      return [];
    }
    const data = await response.json();

    return NextResponse.json(
      data.features.map((feature: IGeocoderFeature) => ({
        id: feature.id,
        longitude: feature.center[0], //緯度
        latitude: feature.center[1], //経度
        place_name: feature.place_name,
        text: feature.text,
        address: feature?.properties?.address,
        category: feature?.properties?.category && feature.properties.category.split(', '),
      }))
    );
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
