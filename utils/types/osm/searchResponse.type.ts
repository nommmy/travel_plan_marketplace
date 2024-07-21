export type SearchResponse = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lon: string; //経度
  lat: string; //緯度
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boudingbox: string[];
};

export type OSMData = {
  place_id: number;
  longitude: string; //経度
  latitude: string; //緯度
  category: string;
  type: string
  addresstype: string;
  name: string;
  display_name: string;
};