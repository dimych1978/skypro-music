'use client';

import styles from './page.module.css';
import { Nav } from '@/components/Nav/Nav';
import Centerblock from '@/components/Centerblock/Centerblock';
import Sidebar from '@/components/Sidebar/Sidebar';
import PlayerBar from '@/components/PlayerBar/PlayerBar';
import { useEffect, useReducer, useState } from 'react';
import { TrackType } from '@/types';
import { useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';

export default function Home() {
  const user = useAppSelector(state => state.auth);
  console.log('🚀 ~ Home ~ user:', user);
  const router = useRouter();
  useEffect(() => {
    router.push('/trackPages/base');
  }, [router]);
  // const { thisTrack } = useAppSelector(state => state.tracksSlice);
  return null;
  // return (
  //   <div className={styles.wrapper}>
  //     <div className={styles.container}>
  //       <main className={styles.main}>
  //         <Nav />
  //         <Centerblock />
  //         <Sidebar />
  //       </main>
  //       {/* {thisTrack && <PlayerBar thisTrack={thisTrack} />} */}
  //       <footer className='footer'></footer>
  //     </div>
  //   </div>
  // );
}
