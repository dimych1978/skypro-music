'use client';

import styles from './Centerblock.module.css';
import Content from '../Content/Content';
import Filter from '../Filter/Filter';
import Search from '../Search/Search';
import { TrackType } from '@/types';
import { getTracks } from '@/api/trackApi';
import ErrorPage from '@/app/error';
import { useEffect, useState } from 'react';

type props = { setThisTrack: (track: TrackType) => void };

const Centerblock = ({ setThisTrack }: props) => {
  const [tracks, setTracks] = useState<TrackType[]>([]);

  useEffect(() => {
    const getData = async () => {
      // let tracks: TrackType[] = [];
      try {
        const data = await getTracks();
        setTracks(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          return <ErrorPage error={error.message} reset={(() => {})()} />;
        }
      }
    };
    getData();
  }, [setThisTrack]);
  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter tracks={tracks} />
      <Content tracks={tracks} setThisTrack={setThisTrack} />
    </div>
  );
};

export default Centerblock;
