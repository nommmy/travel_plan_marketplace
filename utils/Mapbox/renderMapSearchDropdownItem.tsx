import { renderToStaticMarkup } from 'react-dom/server';
import MapSearchDropdownItem from '@/components/Mapbox/MapSearchDropdownItem';
import type MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export default function renderMapSearchDropdownItem(item: MapboxGeocoder.Result) {
  return renderToStaticMarkup(<MapSearchDropdownItem item={item} />);
}
