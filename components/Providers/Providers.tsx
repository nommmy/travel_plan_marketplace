import { atom, Provider, useAtomValue, useSetAtom } from 'jotai';
import type { ReactNode } from 'react';
import type { Spot } from '@/utils/mapbox/geocodingResponse.type';
import mapboxgl from 'mapbox-gl';

export default function Providers({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}

const plan = atom<Spot[]>([]);

export const useGetPlan = () => {
  return useAtomValue(plan);
};

export const useSetPlan = () => {
  const setPlan = useSetAtom(plan);
  return setPlan;
};

const map = atom<mapboxgl.Map | null>(null);

export const useGetMap = () => {
  return useAtomValue(map);
}

export const useSetMap = () => {  
  const setMap = useSetAtom(map);
  return setMap;
}