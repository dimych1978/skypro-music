'use client';

import { useEffect } from 'react';
import Content from '../Content/Content';
import Filter from '../Filter/Filter';
import { useGetTracks } from '@/hooks/useGetTracks';
import { setTrackState } from '@/store/features/trackSlice';
import { useAppDispatch } from '@/store/store';
import { TrackType } from '@/types';

export default function Centerblock() {
  const dispatch = useAppDispatch();
  const { getAllTracks } = useGetTracks();

  useEffect(() => {
    const response = async () => {
      const data = (await getAllTracks()) as TrackType[];
      dispatch(setTrackState(data));
    };
    response();
  }, []);

  return (
    <>
      <Filter />
      <Content />
    </>
  );
}
