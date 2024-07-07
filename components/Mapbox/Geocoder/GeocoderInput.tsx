'use client';

import { Search } from 'react-feather';
import { useState } from 'react';
import MapSearchDropdownItem from './MapSearchDropdownItem';
import type { Spot } from '@/utils/mapbox/geocodingResponse.type';
import { css } from '@kuma-ui/core';

const geocoderWrapper = css`
  float: right;
  margin: 10px 10px 0 0;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  font-size: 18px;
  line-height: 24px;
  background-color: #fff;
  width: 100%;
  min-width: 240px;
  border-radius: 4px;
  transition:
    width 0.25s,
    min-width 0.25s;
  clear: both;
  pointer-events: auto;
  transform: translate(0);
  position: absolute;
  z-index: 2;
  right: 0;
  top: 0;

  @media screen and (min-width: 640px) {
    width: 25%;
    font-size: 16px;
    line-height: 20px;
    max-width: 360px;
  }
`;

const geocoderSearchIcon = css`
  display: inline-block;
  vertical-align: middle;
  speak: none;
  position: absolute;
  top: 13px;
  left: 12px;
  width: 23px;
  height: 23px;

  @media screen and (min-width: 640px) {
    top: 8px;
    left: 7px;
    width: 20px;
    height: 20px;
  }
`;

const geocoderInput = css`
  width: 100%;
  border: 0;
  background-color: transparent;
  margin: 0;
  height: 50px;
  padding: 6px 45px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  @media screen and (min-width: 640px) {
    height: 36px;
    padding: 6px 35px;
  }
`;

const suggestionsList = css`
  background-color: #fff;
  border-radius: 4px;
  left: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 100%;
  top: 110%;
  top: calc(100% + 6px);
  z-index: 1000;
  overflow: hidden;
  font-size: 15px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);

  @media screen and (min-width: 640px) {
    font-size: 13px;
  }
`;

const GeocoderInput = () => {
  const [result, setResult] = useState<Spot[]>([]);

  //TODO: 後で型つける
  const handleSearch = async (e: any) => {
    e.preventDefault();
    const query = e.target['search_text'].value;

    if (!query.trim()) return;

    try {
      const response = await fetch(`/api/mapbox/geocoding?search_text=${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setResult([]);
    }
  };

  return (
    <div className={geocoderWrapper}>
      <form onSubmit={handleSearch}>
        <button type="submit">
          <Search size={20} className={geocoderSearchIcon} />
        </button>
        <input type="text" className={geocoderInput} name="search_text" placeholder="Search" aria-label="Search" />
      </form>
      {!!result && (
        <ul className={suggestionsList}>
          {result.map((item) => (
            <li key={item.id}>
              <MapSearchDropdownItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GeocoderInput;
