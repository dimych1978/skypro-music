import styles from '@/components/PlayList/Playlist.module.css';
import { useLikeTrack } from '@/hooks/useLikeTrack';
import { addFavoriteTracks } from '@/store/features/authSlice';
import { setFavTracks, setThisTrack } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { TrackType } from '@/types';
import { useEffect } from 'react';

const TrackItem = ({ track }: { track: TrackType }) => {
  const dispatch = useAppDispatch();

  const { isPlaying, thisTrack } = useAppSelector(state => state.tracksSlice);

  const { token, favorite } = useAppSelector(state => state.auth);
  // console.log('🚀 ~ TrackItem ~ token:', token);

  const { handleLike, isLiked } = useLikeTrack(track._id);

  const handleTrack = (track: TrackType) => {
    dispatch(setThisTrack(track));
  };

  // useEffect(() => {
  //   try {
  //     if (token.access && token.refresh) {
  //       dispatch(
  //         addFavoriteTracks({ access: token.access, refresh: token.refresh })
  //       );
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   // console.log('token', token);
  //   try {
  //     // console.log('favorite TrackItem', favorite);
  //     if (token.access && token.refresh)
  //       dispatch(
  //         addFavoriteTracks({ access: token.access, refresh: token.refresh })
  //       );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  return (
    <div className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle} onClick={() => handleTrack(track)}>
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
        <div className={'track__time'} onClick={handleLike}>
          <svg
            className={styles.trackTimeSvg}
            style={isLiked ? { fill: '#fff' } : { fill: '#696969' }}
          >
            <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
          </svg>
          <span className={styles.trackTimeText}>
            {track.duration_in_seconds}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
