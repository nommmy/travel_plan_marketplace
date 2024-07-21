import { NextResponse } from 'next/server';
import { Spot as FindPlaceResponse } from '@/utils/types/google/findplaceResponse.type';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('search_text')?.replace(/,/g, '');
  if (!q) return [];

  try {
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const FIELDS = 'formatted_address%2Cgeometry%2Cicon%2Cicon_mask_base_uri%2Cicon_background_color%2Cname%2Cphoto%2Cplace_id%2Cplus_code%2Ctypes';

    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?fields=${FIELDS}&language=ja&input=${q}&inputtype=textquery&key=${GOOGLE_API_KEY}`;
    // place detail
    // const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJCewJkL2LGGAR3Qmk0vCTGkg&key=${GOOGLE_API_KEY}`;
    // place autocomplete
    // const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${q}&key=${GOOGLE_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      console.error('Failed to fetch autocomplete suggestions:', response.statusText);
      return [];
    }
    const data = await response.json();

    return NextResponse.json(
      data.candidates.map((item: FindPlaceResponse) => ({
        formatted_address: item.formatted_address,
        geometry: item.geometry,
        icon: item.icon,
        icon_mask_base_uri: item.icon_mask_base_uri,
        icon_background_color: item.icon_background_color,
        name: item.name,
        photos: item.photos,
        place_id: item.place_id,
        plus_code: item.plus_code,
        types: item.types,
      }))
    );
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
