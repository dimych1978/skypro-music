'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import styles from '../../page.module.css';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useEffect } from 'react';
import { addFavoriteTracks } from '@/store/features/authSlice';

function Base() {
  const { token } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      if (token.access && token.refresh) {
        dispatch(
          addFavoriteTracks({ access: token.access, refresh: token.refresh })
        ).unwrap();
      }
    } catch (error) {
      console.warn(error);
    }
  }, []);

  return (
    <>
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Centerblock />
    </>
  );
}
export default Base;
