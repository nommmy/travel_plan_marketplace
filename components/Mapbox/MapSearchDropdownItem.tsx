'use client';

import type MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { css } from '@kuma-ui/core';
import { useSetPlan } from '../Providers/Providers';
import { PlusCircle } from 'react-feather';

type Props = {
  item: MapboxGeocoder.Result;
};

const geocoderDropdownItemSubtext = css`
  color: gray;
  font-size: 0.725rem;
`;

const geocoderDropdownHolder = css`
  display: flex;
  align-items: center;
`;

const geocoderDropdownItemTextGroup = css`
  flex: 1;
`;

const ICON_SIZE = 20;
const planAddButton = css`
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;

const MapSearchDropdownItem = ({ item }: Props) => {
  const setPlan = useSetPlan();
  const addPlan = (e: React.MouseEvent, item: MapboxGeocoder.Result) => {
    e.stopPropagation();
    e.preventDefault();
    setPlan([
      {
        longitude: item.center[1], //緯度
        latitude: item.center[0], //経度
        place_name: item.text,
        address: item?.properties?.address,
        category: item?.properties?.category,
        foursquare: item?.properties?.foursquare,
        isLandmark: item?.properties?.landmark,
      },
    ]);
  };
  
  return (
    <div className={geocoderDropdownHolder}>
      <div className={geocoderDropdownItemTextGroup}>
        <p>{item.text}</p>
        <p className={geocoderDropdownItemSubtext}>{item?.properties?.address}</p>
      </div>
      <button className={planAddButton} onClick={(e) => addPlan(e, item)}>
        <PlusCircle size={ICON_SIZE} />
      </button>
    </div>
  );
};

export default MapSearchDropdownItem;
