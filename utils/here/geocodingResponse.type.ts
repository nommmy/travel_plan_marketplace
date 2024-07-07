/**
 *
 * @see https://www.here.com/docs/bundle/geocoding-and-search-api-v7-api-reference/page/index.html#/paths/~1discover/get
 */

export type GeocodingResponse = {
  items: Array<DiscoverItems>;
};

type Position = {
  lat: number;
  lng: number;
};

type Category = {
  id: string;
  name?: string;
  primary?: boolean;
};

type References = {
  supplier: { id: string };
  id: string;
};

type FoodType = {
  id: string;
  name?: string;
  primary?: boolean;
};

type ContactDetail = {
  label?: string;
  value: string;
  categories?: Array<{ id: string }>;
};

type Contact = {
  phone: Array<ContactDetail>;
  mobile: Array<ContactDetail>;
  tollFree: Array<ContactDetail>;
  fax: Array<ContactDetail>;
  www: Array<ContactDetail>;
  email: Array<ContactDetail>;
};

type OpeningHours = {
  categories?: Array<{ id: string }>;
  text: Array<string>;
  isOpen?: boolean;
  structured: Array<{
    start: string;
    duration: string;
    recurrence: string;
  }>;
};

type ImageItem = {
  href: string;
  date?: string;
  supplier: { id: string };
};

type ImageEditorial = {
  description: string;
  language: string;
  href?: string;
  supplier: { id: string };
};

type ImageRating = {
  count: number;
  average: number;
  href?: string;
  supplier: { id: string };
};

type Media = {
  images?: Array<{ items: Array<ImageItem> }>;
  editorials?: Array<{ items: Array<ImageEditorial> }>;
  ratings?: Array<{ items: Array<ImageRating> }>;
};

export type DiscoverItems = {
  title: string;
  id: string;
  ontologyId?: string;
  resultType?: string;
  address: {
    label?: string;
    countryCode?: string;
    countryName?: string;
    stateCode?: string;
    state?: string;
    county?: string;
    city?: string;
    district?: string;
    street?: string;
    postalCode?: string;
    houseNumber?: string;
  };
  position?: Position;
  access?: Array<Position>;
  distance?: number;
  categories?: Array<Category>;
  references?: Array<References>;
  foodTypes?: Array<FoodType>;
  contacts?: Array<Contact>;
  openingHours?: Array<OpeningHours>;
  media?: Media;
};

// type DiscoverItemsから必要そうなやつを持ってくる
// /api/geocodingのresponseで絞ってるもの全て
export type Spot = {
  title: string;
  id: string;
  longitude: number; //緯度
  latitude: number; //経度
  address: {
    label?: string;
    countryCode?: string;
    countryName?: string;
    stateCode?: string;
    state?: string;
    county?: string;
    city?: string;
    district?: string;
    street?: string;
    postalCode?: string;
    houseNumber?: string;
  };
  categories?: Array<Category>;
  foodTypes?: Array<FoodType>;
  media?: Media;
};
