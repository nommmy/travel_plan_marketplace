import { atom, Provider, useAtomValue, useSetAtom } from 'jotai';
import type { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}

export type Spot = {
  id: string;
  longitude: number; //緯度
  latitude: number; //経度
  place_name: string;
  text: string;
  address?: string;
  category?: string[];
};

const plan = atom<Spot[]>([]);

export const useGetPlan = () => {
  return useAtomValue(plan);
};

export const useSetPlan = () => {
  const setPlan = useSetAtom(plan);
  return setPlan;
};
