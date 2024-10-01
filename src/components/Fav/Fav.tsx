'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { addFavoriteTracks } from '@/store/features/authSlice';
import TrackItem from '../TrackItem/TrackItem';
import { setTrackState } from '@/store/features/trackSlice';

const Fav = () => {
  const dispatch = useAppDispatch();
  const { token, favorite } = useAppSelector(state => state.auth);

  useEffect(() => {
    const getData = async () => {
      try {
        if (token.access && token.refresh) {
          await dispatch(
            addFavoriteTracks({ access: token.access, refresh: token.refresh })
          );
          dispatch(setTrackState(favorite));
        }
      } catch (error) {
        console.warn(error);
      }
    };
    getData();
  }, []);
  return (
    <>
      {favorite.length > 0 ? (
        favorite.map(track => <TrackItem key={track._id} track={track} />)
      ) : (
        <h2>Любимых треков пока нет. Добавьте же их скорее!</h2>
      )}
    </>
  );
};

export default Fav;
