'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { addFavoriteTracks } from '@/store/features/authSlice';
import TrackItem from '../TrackItem/TrackItem';
import { setTrackState } from '@/store/features/trackSlice';

const Fav = () => {
  const dispatch = useAppDispatch();
  const { token, favorite, authState } = useAppSelector(state => state.auth);
  console.log(
    '🚀 ~ Fav ~ useAppSelector(state => state.auth):',
    useAppSelector(state => state.auth)
  );

  useEffect(() => {
    console.log(favorite);
    try {
      // if (token.access && token.refresh) {
      //   dispatch(
      //     addFavoriteTracks({ access: token.access, refresh: token.refresh })
      //   ).then(data => dispatch(setTrackState(data.payload)));
      // }
      dispatch(setTrackState(favorite));
    } catch (error) {
      console.warn(error);
    }
  }, [favorite]);
  console.log(favorite);
  return (
    <>
      {favorite.map(track => (
        <TrackItem key={track._id} track={track} />
      ))}
    </>
  );
};

export default Fav;
