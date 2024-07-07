'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import 'mapbox-gl/dist/mapbox-gl.css';
import { css } from '@kuma-ui/core';
import GeocoderInput from './Geocoder/GeocoderInput';
import { useGetMap, useSetMap } from '../Providers/Providers';

const mapWrapper = css`
  height: 100%;
  flex: 1;
`;

export default function Map() {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';
  const mapContainer = useRef(null);
  const map = useGetMap();
  const setMap = useSetMap();

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

      map.addControl(language);

      map.on('load', () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, setMap]);

  return (
    <>
      <div ref={mapContainer} className={mapWrapper} />
      <GeocoderInput />
    </>
  );
}
