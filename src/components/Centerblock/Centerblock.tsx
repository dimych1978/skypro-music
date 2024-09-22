'use client';

// import styles from './page.module.css';
import { Nav } from '@/components/Nav/Nav';
// import Centerblock from '@/components/Centerblock/Centerblock';
import Sidebar from '@/components/Sidebar/Sidebar';
import PlayerBar from '@/components/PlayerBar/PlayerBar';
import { useEffect, useState } from 'react';
import { TrackType } from '@/types';
import { useAppSelector } from '@/store/store';
import { getTracks } from '@/api/trackApi';
import ErrorPage from '@/app/error';
import Content from '../Content/Content';
import Filter from '../Filter/Filter';

export default function Centerblock() {
  const [tracks, setTracks] = useState<TrackType[]>([]);

  const { thisTrack } = useAppSelector(state => state.tracksSlice);
  useEffect(() => console.log('problem', thisTrack), []);
  useEffect(() => {
    const getData = async () => {
      // let tracks: TrackType[] = [];
      try {
        const data = await getTracks();
        setTracks(data);
        console.log('tracks', data);
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
