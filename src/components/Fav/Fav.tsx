'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  addFavoriteTracks,
  updateTokenThunk,
} from '@/store/features/authSlice';
import TrackItem from '../TrackItem/TrackItem';
import { useRouter } from 'next/navigation';

const Fav = () => {
  const dispatch = useAppDispatch();
  const { token, favorite, authState, email } = useAppSelector(
    state => state.auth
  );
  console.log('🚀 ~ Fav ~ email:', email);

  const route = useRouter();

  useEffect(() => {
    try {
      if (token.refresh) dispatch(updateTokenThunk(token.refresh));
      console.log('authState', authState);
    } catch (error) {
      console.warn(error);
    }
  }, []);

  useEffect(() => {
    try {
      if (token.access) {
        dispatch(addFavoriteTracks(token.access));
      }
    } catch (error) {
      console.warn(error);
    }
  }, [token.access, dispatch]);

  return (
    <>
      {authState ? (
        favorite.map(track => <TrackItem key={track._id} track={track} />)
      ) : (
        <h3>
          <span onClick={() => route.push('/registry')}>Зарегистрируйтесь</span>
          или
          <span onClick={() => route.push('/login')}>войдите</span>
        </h3>
      )}
    </>
  );
};

export default Fav;
