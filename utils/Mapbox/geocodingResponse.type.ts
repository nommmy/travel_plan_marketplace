/**
 *
 * @see https://docs.mapbox.com/api/search/geocoding-v5/#geocoding-response-object
 */

export type IGeocoderContext = {
  id: string;
  mapbox_id: string;
  wikidata: string;
  text: string;
};

export type IGeocoderFeature = {
  id: string;
  type: 'Feature';
  place_type: Array<string>;
  relevance: number;
  address?: string;
  properties: IGeocoderProperties;
  text: string;
  place_name: string;
  matching_text?: string;
  matching_place_name?: string;
  language?: string;
  bbox: [number, number, number, number];
  center: [number, number];
  geometry: IGecoderGeometry;
  context: Array<IGeocoderContext>;
  routable_points?: object;
};

export type IGeocoderProperties = {
  accuracy?: string;
  address?: string;
  category?: string;
  maki?: string;
  wikidata?: string;
  short_code?: string;
  landmark?: boolean; //legacy
  tel?: string; //legacy
};

export type IGecoderGeometry = {
  coordinates: [number, number];
  type: 'Point';
  interpolated?: boolean;
  omitted?: boolean;
};

export type IGeocoderResult = {
  type: 'FeatureCollection';
  features: Array<IGeocoderFeature>;
  query: Array<string | number>;
  attribution: string;
};

/**
 * Various types of geographic features availabled in the Mapbox geocoder.
 *
 * @see https://docs.mapbox.com/api/search/#data-types
 */
export enum PlaceType {
  COUNTRY = 'country',
  REGION = 'region',
  POSTCODE = 'postcode',
  DISTRICT = 'district',
  PLACE = 'place',
  LOCALITY = 'locality',
  NEIGHBORHOOD = 'neighborhood',
  ADDRESS = 'address',
  POI = 'poi',
}

export type Spot = {
  id: string;
  longitude: number; //緯度
  latitude: number; //経度
  place_name: string;
  text: string;
  address?: string;
  category?: string[];
};
