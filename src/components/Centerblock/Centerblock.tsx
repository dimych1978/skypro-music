'use client';

import PlayerBar from '@/components/PlayerBar/PlayerBar';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getTracks } from '@/api/trackApi';
import ErrorPage from '@/app/error';
import Content from '../Content/Content';
import Filter from '../Filter/Filter';
import { setThisTrack, setTrackState } from '@/store/features/trackSlice';

export default function Centerblock() {
  const dispatch = useAppDispatch();
  const { thisTrack } = useAppSelector(state => state.tracksSlice);

  useEffect(() => {
    dispatch(setThisTrack(null));
    const getData = async () => {
      try {
        const data = await getTracks();
        dispatch(setTrackState(data));
      } catch (error: unknown) {
        if (error instanceof Error) {
          return <ErrorPage error={error.message} reset={(() => {})()} />;
        }
      }
    };
    getData();
  }, []);

  return (
    <>
      <Filter />
      <Content />
      {thisTrack && <PlayerBar thisTrack={thisTrack} />}
    </>
  );
}
