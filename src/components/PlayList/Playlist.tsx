'use client';
import React from 'react';
import styles from './Playlist.module.css';
import { useAppSelector } from '@/store/store';
import TrackItem from '../TrackItem/TrackItem';

const Playlist = () => {
  const { tracks } = useAppSelector(state => state.tracksSlice);

  return (
    <div className={`${styles.contentPlaylist} playlist`}>
      {tracks.map(track => (
        <TrackItem key={track._id} track={track} />
      ))}
    </div>
  );
};

export default Playlist;
