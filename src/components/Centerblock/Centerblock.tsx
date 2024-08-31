'use client';

import styles from './Centerblock.module.css';
import Content from '../Content/Content';
import Filter from '../Filter/Filter';
import Search from '../Search/Search';
import { TrackType } from '@/types';
import { getTracks } from '@/api/trackApi';
import ErrorPage from '@/app/error';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/store';
import { setTrackState } from '@/store/features/trackSlice';

const Centerblock = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      // let tracks: TrackType[] = [];
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
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter />
      <Content />
    </div>
  );
};

export default Centerblock;
