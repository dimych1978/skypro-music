'use client';
import React from 'react';
import styles from './Playlist.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setThisTrack } from '@/store/features/trackSlice';
import { TrackType } from '@/types';

const Playlist = () => {
  const { tracks, thisTrack, isPlaying } = useAppSelector(
    state => state.tracksSlice
  );

  const dispatch = useAppDispatch();

  const handleTrack = (track: TrackType) => {
    dispatch(setThisTrack(track));
  };

  return (
    <div className={`${styles.contentPlaylist} playlist`}>
      {tracks.map(track => (
        <div key={track._id} onClick={() => handleTrack(track)}>
          <div className={styles.playlistItem}>
            <div className={styles.playlistTrack}>
              <div className={styles.trackTitle}>
                <div className={styles.trackTitleImage}>
                  {thisTrack === track ? (
                    <span
                      className={
                        isPlaying
                          ? styles.trackTitleActivePlaying
                          : styles.trackTitleActive
                      }
                    />
                  ) : (
                    <svg className={styles.trackTitleSvg}>
                      <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
                    </svg>
                  )}
                </div>
                <div className='track__title-text'>
                  <a
                    className={styles.trackTitleLink}
                    // href='http://'
                  >
                    {track.author}
                    <span className={styles.trackTitleSpan}></span>
                  </a>
                </div>
              </div>
              <div className={styles.trackAuthor}>
                <a
                  className={styles.trackAuthorLink}
                  //  href='http://'
                >
                  {track.album}
                </a>
              </div>
              <div className={styles.trackAlbum}>
                <a
                  className={styles.trackAlbumLink}
                  // href='http://'
                >
                  {track.name}
                </a>
              </div>
              <div className={'track__time'}>
                <svg className={styles.trackTimeSvg}>
                  <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
                </svg>
                <span className={styles.trackTimeText}>
                  {track.duration_in_seconds}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Playlist;
