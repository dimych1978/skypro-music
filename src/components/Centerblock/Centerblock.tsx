'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/store';
import { getTracks } from '@/api/trackApi';
import ErrorPage from '@/app/error';
import Content from '../Content/Content';
import Filter from '../Filter/Filter';
import {  setTrackState } from '@/store/features/trackSlice';

export default function Centerblock() {
  const dispatch = useAppDispatch();

  useEffect(() => {
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
    </>
  );
}
