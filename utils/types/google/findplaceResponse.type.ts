type LatLngLiteral = {
  lat: number;
  lng: number;
};

type Gepmetry = {
  location: LatLngLiteral;
  viewport: {
    northeast: LatLngLiteral;
    southwest: LatLngLiteral;
  };
};

type PlacePhoto = {
  height: number;
  html_attributions: string[];
  photo_reference: string;
  width: number;
};

type PlusCode = {
  global_code: string;
  compound_code: string;
};

export type Spot = {
  formatted_address: string;
  geometry: Gepmetry;
  icon: string;
  icon_mask_base_uri: string;
  icon_background_color: string;
  name: string;
  photos: PlacePhoto;
  place_id: string;
  plus_code: PlusCode;
  types: string[];
};
