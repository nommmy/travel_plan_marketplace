import Map from '@/components/Mapbox/Map';
import Schedule from '@/components/Mapbox/Schedule';
import Providers from '@/components/Providers/Providers';
import { css } from '@kuma-ui/core';

const planPage = css`
  height: 100vh;
  display: flex;
`;

const PlanningPage = () => {
  return (
    <main className={planPage}>
      <Providers>
        <Schedule />
        <Map />
      </Providers>
    </main>
  );
};

export default PlanningPage;
