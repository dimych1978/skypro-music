'use client';

// import styles from './page.module.css';
import { Nav } from '@/components/Nav/Nav';
// import Centerblock from '@/components/Centerblock/Centerblock';
import Sidebar from '@/components/Sidebar/Sidebar';
import PlayerBar from '@/components/PlayerBar/PlayerBar';
import { useEffect, useState } from 'react';
import { TrackType } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { getTracks } from '@/api/trackApi';
import ErrorPage from '@/app/error';
import Content from '../Content/Content';
import Filter from '../Filter/Filter';
import { setTrackState } from '@/store/features/trackSlice';

export default function Centerblock() {
  const dispatch = useAppDispatch();
  const { thisTrack } = useAppSelector(state => state.tracksSlice);
  console.log('🚀 ~ Centerblock ~ thisTrack:', thisTrack);

  const { email } = useAppSelector(state => state.auth);
  console.log('🚀 ~ Centerblock ~ user:', email);

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
    // <div className={styles.wrapper}>
    //   <div className={styles.container}>
    //     <main className={styles.main}>
    // <Nav />
    <>
      {/* // <Sidebar />
        // </main> */}
      <Filter />
      <Content />
      {thisTrack && <PlayerBar thisTrack={thisTrack} />}
    </>
    // /     <footer className='footer'></footer>
    //   </div>
    // </div>
  );
}
