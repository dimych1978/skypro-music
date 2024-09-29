'use client';
import React, { useEffect } from 'react';
import styles from './Playlist.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import TrackItem from '../TrackItem/TrackItem';
import { setFavTracks } from '@/store/features/trackSlice';

const Playlist = () => {
  const { tracks } = useAppSelector(state => state.tracksSlice);
  const { favorite } = useAppSelector(state => state.auth);
  console.log('🚀 ~ Playlist ~ favorite:', favorite);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFavTracks(favorite));
  }, [favorite]);

  return (
    <div className={`${styles.contentPlaylist} playlist`}>
      {tracks.map(track => (
        <TrackItem key={track._id} track={track} />
      ))}
    </div>
  );
};

export default Playlist;
