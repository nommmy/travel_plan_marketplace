'use client';

import { css } from '@kuma-ui/core';
import { useGetPlan, useSetPlan, useGetMap } from '../../Providers/Providers';
import { PlusCircle } from 'react-feather';
import type { OSMData } from '@/utils/types/osm/searchResponse.type';

const geocoderDropdownItemSubtext = css`
  color: gray;
  font-size: 0.725rem;
`;

const geocoderDropdownHolder = css`
  display: flex;
  align-items: center;
  padding: 6px 12px;

  &:hover {
    background-color: #f3f3f3;
    cursor: pointer;
  }
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

type Props = {
  item: OSMData;
};

const MapSearchDropdownItem = ({ item }: Props) => {
  const setPlan = useSetPlan();
  const plan = useGetPlan();

  // const fetchPlaceDetail = async (place_name: string) => {
  //   const response = await fetch(`/api/google/findplace?search_text=${place_name}`);
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   const data = await response.json();
  //   return data;
  // };

  // TODO: 重複対応してない
  // TODO: ピンたてる、番号つける
  const addPlan = async (item: OSMData) => {
    setPlan([
      {
        place_id: item.place_id,
        category: item.category,
        longitude: item.longitude, //経度
        latitude: item.latitude, //緯度
        type: item.type,
        addresstype: item.addresstype,
        name: item.name,
        display_name: item.display_name,
      },
    ]);
  };

  const map = useGetMap();
  // TODO: ピンたてる
  // TODO: 詳細出す
  const flyTo = async (item: OSMData) => {
    map &&
      map.flyTo({
        center: [Number(item.longitude), Number(item.latitude)],
        duration: 0,
        zoom: 20,
      });
  };

  const addressArray = item.display_name.split(', ');
  const address = addressArray
    .slice(1, addressArray.length - 2)
    .reverse()
    .join('');

  return (
    <div className={geocoderDropdownHolder}>
      <div className={geocoderDropdownItemTextGroup} onClick={() => flyTo(item)}>
        <p>{item.name}</p>
        <p className={geocoderDropdownItemSubtext}>{address}</p>
      </div>
      <button className={planAddButton} onClick={() => addPlan(item)}>
        <PlusCircle size={ICON_SIZE} />
      </button>
    </div>
  );
};

export default MapSearchDropdownItem;
