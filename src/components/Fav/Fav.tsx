'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { addFavoriteTracks } from '@/store/features/authSlice';
import TrackItem from '../TrackItem/TrackItem';
import { useRouter } from 'next/navigation';

const Fav = () => {
  const dispatch = useAppDispatch();
  const { token, favorite, authState } = useAppSelector(state => state.auth);

  useEffect(() => {
    try {
      if (token.access && token.refresh) {
        dispatch(
          addFavoriteTracks({ access: token.access, refresh: token.refresh })
        ).unwrap();
      }
      // console.log('favorite', favorite, 'authState', authState);
    } catch (error) {
      console.warn(error);
    }
  }, [dispatch, token.access, token.refresh]);

  return (
    <>
      {favorite.map(track => (
        <TrackItem key={track._id} track={track} />
      ))}
    </>
  );
};

export default Fav;
