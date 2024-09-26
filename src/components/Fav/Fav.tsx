'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  addFavoriteTracks,
  TokensType,
  updateTokenThunk,
} from '@/store/features/authSlice';
import TrackItem from '../TrackItem/TrackItem';
import { useRouter } from 'next/navigation';
import PlayerBar from '../PlayerBar/PlayerBar';
import Filter from '../Filter/Filter';

const Fav = () => {
  const dispatch = useAppDispatch();
  const { token, favorite, authState } = useAppSelector(state => state.auth);
  const user = useAppSelector(state => state.auth);
  console.log('🚀 ~ Fav ~ user:', user);
  const route = useRouter();

  // useEffect(() => {
  //   try {
  //     if (token.refresh) dispatch(updateTokenThunk(token.refresh));
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }, []);
  const getFunc = async () => {
    try {
      if (token.access && token.refresh) {
        dispatch(
          addFavoriteTracks({ access: token.access, refresh: token.refresh })
        ).unwrap();
      }
      console.log('🚀 ~ getFunc ~ token:', token);
      console.log('favorite', favorite);
    } catch (error) {
      console.warn(error);
    }
  };
  useEffect(() => {
    getFunc();
  }, [dispatch, token]);
  useEffect(() => console.log(favorite), [token]);

  return (
    <>
      <div onClick={getFunc}>2222</div>
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
