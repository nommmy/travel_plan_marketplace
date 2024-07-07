'use client';

import { css } from '@kuma-ui/core';
import { useGetPlan, useSetPlan, useGetMap } from '../../Providers/Providers';
import { PlusCircle } from 'react-feather';
import type { Spot } from '@/utils/here/geocodingResponse.type';

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
  item: Spot;
};

const MapSearchDropdownItem = ({ item }: Props) => {
  const setPlan = useSetPlan();
  const plan = useGetPlan();
  const addPlan = (item: Spot) => {
    setPlan([
      {
        title: item.title,
        id: item.id,
        longitude: item?.longitude, //緯度
        latitude: item?.latitude, //経度
        address: item.address,
        categories: item?.categories,
        foodTypes: item?.foodTypes,
        media: item?.media,
      },
    ]);
    // setPlan([
    //   id: item.id,
    //   longitude: item.longitude, //緯度        
    //   latitude: item.latitude, //経度
    //   place_name: item.place_name,
    //   text: item.text,
    //   address: item?.address,
    //   category: item?.category,
    // ])
  };

  const map = useGetMap();
  const flyTo = (item: Spot) => {
    map && map.flyTo({
      center: [item.longitude, item.latitude],
      duration: 0,
    });
  }

  // 郵便番号を除いた住所を取得
  const addressWithoutPostalCode = item.address?.label?.startsWith('〒') ? item.address?.label?.split(' ').slice(1).join(' ') : item.address?.label;

  return (
    <div className={geocoderDropdownHolder}>
      <div className={geocoderDropdownItemTextGroup} onClick={() => flyTo(item)}>
        <p>{item.title}</p>
        <p className={geocoderDropdownItemSubtext}>{addressWithoutPostalCode}</p>
      </div>
      <button className={planAddButton} onClick={() => addPlan(item)}>
        <PlusCircle size={ICON_SIZE} />
      </button>
    </div>
  );
};

export default MapSearchDropdownItem;
