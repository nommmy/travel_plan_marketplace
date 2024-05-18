'use client';

import { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import renderMapSearchDropdownItem from '@/utils/Mapbox/renderMapSearchDropdownItem';
import { css } from '@kuma-ui/core';

const mapWrapper = css`
  height: 100%;
  flex: 1;
`;

export default function Map() {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }: { setMap: any; mapContainer: any }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        center: [139.7670516, 35.6811673], // 東京駅を初期値点として表示（緯度、経度を指定）
        zoom: 15,
        maxZoom: 18,
        minZoom: 5,
        style: 'mapbox://styles/mapbox/streets-v12',
      });
      // 言語変更設定参考
      // defaultLanguageとしてjaを指定
      const language = new MapboxLanguage({ defaultLanguage: 'ja' });

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        // language: 'ja',
        placeholder: 'Search',
        flyTo: { duration: 0 },
        limit: 5,
        mapboxgl: mapboxgl,
        // autocomplete: false,
        render: (item: MapboxGeocoder.Result) => {
          return renderMapSearchDropdownItem(item);
        },
        getItemValue: (item: MapboxGeocoder.Result) => item.text,
      });

      map.addControl(language);
      map.addControl(geocoder);

      map.on('load', () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map]);

  return (
    <>
      <div ref={mapContainer} className={mapWrapper} />
    </>
  );
}
