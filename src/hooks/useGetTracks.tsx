'use client';

import { getTracks } from '@/api/trackApi';
import ErrorPage from '@/app/error';

export const useGetTracks = () => {
  const getAllTracks = async () => {
    try {
      const data = await getTracks();
      // dispatch(setTrackState(data));
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return <ErrorPage error={error.message} reset={(() => {})()} />;
      }
    }
  };
  return { getAllTracks };
};
