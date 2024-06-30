'use client';

import { css } from '@kuma-ui/core';
import { useGetPlan, useSetPlan } from '../../Providers/Providers';
import { PlusCircle } from 'react-feather';
import type { Spot } from '../../Providers/Providers';

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
  const addPlan = (e: React.MouseEvent, item: Spot) => {
    e.stopPropagation();
    e.preventDefault();
    setPlan([
      {
        id: item.id,
        longitude: item.longitude, //緯度
        latitude: item.latitude, //経度
        place_name: item.place_name,
        text: item.text,
        address: item?.address,
        category: item?.category,
      },
    ]);
  };

  return (
    <div className={geocoderDropdownHolder}>
      <div className={geocoderDropdownItemTextGroup}>
        <p>{item.text}</p>
        <p className={geocoderDropdownItemSubtext}>{item?.address}</p>
      </div>
      <button className={planAddButton} onClick={(e) => addPlan(e, item)}>
        <PlusCircle size={ICON_SIZE} />
      </button>
    </div>
  );
};

export default MapSearchDropdownItem;
