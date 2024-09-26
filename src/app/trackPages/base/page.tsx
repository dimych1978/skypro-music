'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import styles from '../../page.module.css';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useEffect } from 'react';
import { addFavoriteTracks } from '@/store/features/authSlice';

function Base() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth);
  console.log(
    '🚀 ~ Base ~ useAppSelector(state => state.auth):',
    useAppSelector(state => state.auth)
  );
  useEffect(() => {
    if (user.token.access && user.token.refresh)
      dispatch(
        addFavoriteTracks({
          access: user.token.access,
          refresh: user.token.refresh,
        })
      );
    console.log('🚀 ~ Base ~ user:', user);
  }, []);

  return (
    <>
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Centerblock />
    </>
  );
}
export default Base;
