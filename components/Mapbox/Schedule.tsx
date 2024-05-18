'use client'

import { css } from '@kuma-ui/core';
import { useGetPlan } from '../Providers/Providers';

const scheduleWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
  width: 386px;
  overflow-y: scroll;
  padding: 8px 30px;
  background: #f5f5f5;
`;

const Schedule = () => {
  const plan = useGetPlan();
  console.log(plan);

  return (
    <div className={scheduleWrapper}>

    </div>
  )
}

export default Schedule