'use client';

import { useAppSelector } from '@/store/store';
import styles from '../../page.module.css';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useEffect } from 'react';

function Base() {
  const user = useAppSelector(state => state.auth);
  const tracks = useAppSelector(state => state.tracksSlice);
  useEffect(() => {
    console.log('🚀 ~ Base ~ user:', user, 'tracks', tracks);
  }, []);
  return (
    <>
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Centerblock />
    </>
  );
}
export default Base;
