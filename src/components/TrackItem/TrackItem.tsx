import styles from '@/components/PlayList/Playlist.module.css';
import { useLikeTrack } from '@/hooks/useLikeTrack';
import { setThisTrack } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { TrackType } from '@/types';
import Link from 'next/link';
import { useState } from 'react';

const TrackItem = ({ track }: { track: TrackType }) => {
  const dispatch = useAppDispatch();
  const { isPlaying, thisTrack } = useAppSelector(state => state.tracksSlice);

  const [clicked, setClicked] = useState(false);

  const timeFormat = (time: number) => {
    let min: number = Math.floor(time / 60);
    let sec: number = Math.floor(time % 60);
    const result: string = `${min}.${sec < 10 ? '0' + sec : sec} `;
    return result;
  };

  const { handleLike, isLiked } = useLikeTrack(track._id);

  const handleTrack = (track: TrackType) => {
    dispatch(setThisTrack(track));
  };

  const handleLikeClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 2000);
  };

  return (
    <div className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle} onClick={() => handleTrack(track)}>
          <div className={styles.trackTitleImage}>
            {thisTrack?._id === track._id ? (
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
            <span
              className={styles.trackTitleLink}
              // href='http://'
            >
              {track.author}
              <span className={styles.trackTitleSpan}></span>
            </span>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <span
            className={styles.trackAuthorLink}
            // href='http://'
          >
            {track.album}
          </span>
        </div>
        <div className={styles.trackAlbum}>
          <span
            className={styles.trackAlbumLink}
            // href='http://'
          >
            {track.name}
          </span>
        </div>
        <div
          onClick={e => {
            handleLike(e);
            handleLikeClick();
          }}
        >
          <svg
            className={
              clicked ? styles.trackLikeSvgClicked : styles.trackLikeSvg
            }
            style={isLiked ? { fill: '#fff' } : { fill: '#696969' }}
          >
            <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
          </svg>
        </div>
        <div className={styles.track__time}>
          <span className={styles.trackTimeText}>
            {timeFormat(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
