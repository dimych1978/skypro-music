'use client';
import React, { useEffect } from 'react';
import styles from './Playlist.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import TrackItem from '../TrackItem/TrackItem';
import { setFavTracks } from '@/store/features/trackSlice';
import { useFilteredTracks } from '@/hooks/useFilteredTracks';

const Playlist = () => {
  const dispatch = useAppDispatch();

  const { selectTracks, filters } = useAppSelector(state => state.tracksSlice);
  const { filteredTracks } = useFilteredTracks(selectTracks);

  const { favorite } = useAppSelector(state => state.auth);

  const keysFilter = Object.keys(filters);
  const isFilters = keysFilter.filter(item => item !== 'sort');

  const tracks = isFilters.length
    ? filteredTracks
      ? filteredTracks
      : []
    : selectTracks;

  useEffect(() => {
    dispatch(setFavTracks(favorite));
  }, [favorite, dispatch]);

  return (
    <div className={`${styles.contentPlaylist} playlist`}>
      {tracks.length ? (
        tracks.map(track => <TrackItem key={track._id} track={track} />)
      ) : (
        <h2>Треки не найдены</h2>
      )}
    </div>
  );
};

export default Playlist;
