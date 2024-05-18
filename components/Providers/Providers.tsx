import { atom, Provider, useAtomValue, useSetAtom } from 'jotai';
import type { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}

type Plans = {
  longitude: number; //緯度
  latitude: number; //経度
  place_name: string;
  address: string | null;
  category: string[] | null;
  foursquare: string | null;
  isLandmark: boolean | null;
};

const plan = atom<Plans[]>([]);

export const useGetPlan = () => {
  return useAtomValue(plan);
};

export const useSetPlan = () => {
  const setPlan = useSetAtom(plan);
  return setPlan;
};
