'use client';

import { getTracks } from '@/api/trackApi';
import { setTrackState } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import ErrorPage from '@/app/error';
import { useState } from 'react';

export const useGetTracks = () => {
  const dispatch = useAppDispatch();
  const getAllTracks = async () => {
    try {
      const data = await getTracks();
      dispatch(setTrackState(data));
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return <ErrorPage error={error.message} reset={(() => {})()} />;
      }
    }
  };
  return { getAllTracks };
};
