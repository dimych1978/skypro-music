'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { addFavoriteTracks } from '@/store/features/authSlice';
import TrackItem from '../TrackItem/TrackItem';
import { setTrackState } from '@/store/features/trackSlice';
import { useFilteredTracks } from '@/hooks/useFilteredTracks';

const Fav = () => {
  const dispatch = useAppDispatch();
  const { token, favorite } = useAppSelector(state => state.auth);
  const { filters } = useAppSelector(state => state.tracksSlice);

  const { filteredTracks } = useFilteredTracks(favorite);

  const keysFilter = Object.keys(filters);

  const isFilters = keysFilter.filter(item => item !== 'sort');

  const tracks = isFilters.length
    ? filteredTracks
      ? filteredTracks
      : []
    : favorite;

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
      {tracks.length ? (
        tracks.map(track => <TrackItem key={track._id} track={track} />)
      ) : (
        <h2>Любимых треков пока нет. Добавьте же их скорее!</h2>
      )}
    </>
  );
};

export default Fav;
