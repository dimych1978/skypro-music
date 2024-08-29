'use client';

import { TrackType } from '@/types';
import styles from './PlayerBar.module.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ProgressBar from './ProgressBar';

type props = { thisTrack: TrackType };

const PlayerBar = ({ thisTrack }: props) => {
  const { name, author, track_file } = thisTrack;

  const ref = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playPauseIcon, setPlayPauseIcon] = useState<string>(
    '/img/icon/sprite.svg#icon-play'
  );
  const [repeat, setRepeat] = useState(false);

  const handlePlay = () => {
    !isPlaying
      ? (ref.current?.play(),
        setPlayPauseIcon('/img/icon/sprite.svg#icon-pause'))
      : (ref.current?.pause(),
        setPlayPauseIcon('/img/icon/sprite.svg#icon-play'));
    setIsPlaying(!isPlaying);
  };

  const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
    if (ref.current) ref.current.volume = Number(e.target.value) * 0.01;
  };

  const handleRepeat = () => {
    setRepeat(!repeat);
  };

  useEffect(() => {
    setIsPlaying(true);
    setPlayPauseIcon('/img/icon/sprite.svg#icon-pause');
    ref.current?.play();
  }, [thisTrack]);

  const handleEnd = () => {
    setIsPlaying(false);
    if (ref.current) ref.current.currentTime = 0;
    setPlayPauseIcon('/img/icon/sprite.svg#icon-play');
  };

  useEffect(() => {
    ref.current && repeat
      ? (ref.current!.loop = true)
      : (ref.current!.loop = false);
  }, [repeat]);

  return (
    <div className={styles.bar}>
      <audio
        ref={ref}
        src={track_file}
        controls
        style={{ display: 'none' }}
        onEnded={handleEnd}
      />
      <div className={styles.barContent}>
        {thisTrack && <ProgressBar track={ref} />}
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <div
                className={`${styles.playerBtnPrev} btn`}
                onClick={() => alert('Еще не реализовано')}
              >
                <svg className={styles.playerBtnPrevSvg}>
                  <use xlinkHref='/img/icon/sprite.svg#icon-prev'></use>
                </svg>
              </div>
              <div
                className={`${styles.playerBtnPlay} btn`}
                onClick={handlePlay}
              >
                <svg className={styles.playerBtnPlaySvg}>
                  <use xlinkHref={playPauseIcon}></use>
                </svg>
              </div>
              <div
                className={`${styles.playerBtnNext} btn`}
                onClick={() => alert('Еще не реализовано')}
              >
                <svg className={styles.playerBtnNextSvg}>
                  <use xlinkHref='/img/icon/sprite.svg#icon-next'></use>
                </svg>
              </div>
              <div
                className={`${styles.playerBtnRepeat} btnIcon`}
                onClick={handleRepeat}
              >
                <svg
                  className={
                    repeat
                      ? styles.playerBtnRepeatSvgActive
                      : styles.playerBtnRepeatSvg
                  }
                >
                  <use xlinkHref='/img/icon/sprite.svg#icon-repeat' />
                </svg>
              </div>
              <div
                className={`${styles.playerBtnShuffle} btnIcon`}
                onClick={() => alert('Еще не реализовано')}
              >
                <svg className={styles.playerBtnShuffleSvg}>
                  <use xlinkHref='/img/icon/sprite.svg#icon-shuffle'></use>
                </svg>
              </div>
            </div>

            <div className={styles.playerTrackPlay}>
              <div className={styles.trackPlayContain}>
                <div className={styles.trackPlayImage}>
                  <svg className={styles.trackPlaySvg}>
                    <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
                  </svg>
                </div>
                <div className={styles.trackPlayAuthor}>
                  <a className={styles.trackPlayAuthorLink} href='http://'>
                    {name}
                  </a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink} href='http://'>
                    {author}
                  </a>
                </div>
              </div>

              <div className={styles.trackPlayLikeDis}>
                <div className={`${styles.trackPlayLike} btnIcon`}>
                  <svg className={styles.trackPlayLikeSvg}>
                    <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
                  </svg>
                </div>
                <div className={`${styles.trackPlayDislike}  btnIcon`}>
                  <svg className={styles.trackPlayDislikeSvg}>
                    <use xlinkHref='/img/icon/sprite.svg#icon-dislike'></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.barVolumeBlock}>
            <div className={styles.volumeContent}>
              <div className={styles.volumeImage}>
                <svg className={styles.volumeSvg}>
                  <use xlinkHref='/img/icon/sprite.svg#icon-volume'></use>
                </svg>
              </div>
              <div className={`${styles.volumeProgress} btn`}>
                <input
                  className={`${styles.volumeProgressLine} btn`}
                  type='range'
                  name='range'
                  onChange={e => handleVolume(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
