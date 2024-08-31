'use client';

import { TrackType } from '@/types';
import styles from './PlayerBar.module.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ProgressBar, Time } from './ProgressBar';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setIsPlaying,
  setIsShuffle,
  setNextTrack,
  setPreviousTrack,
  setShuffle,
} from '@/store/features/trackSlice';

type props = { thisTrack: TrackType };

const PlayerBar = ({ thisTrack }: props) => {
  const { name, author, track_file } = thisTrack;
  const { isShuffle, isPlaying } = useAppSelector(state => state.tracksSlice);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLAudioElement>(null!);

  const [repeat, setRepeat] = useState(false);

  const next = () => {
    dispatch(setNextTrack());
  };

  const previous = () => {
    dispatch(setPreviousTrack());
  };

  const toggleShuffle = () => {
    dispatch(setIsShuffle(!isShuffle));
  };

  useEffect(() => {
    isShuffle && dispatch(setShuffle());
  }, [isShuffle]);

  const handlePlay = () => {
    dispatch(setIsPlaying(!isPlaying));
    !isPlaying ? ref.current?.play() : ref.current?.pause();
  };

  const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
    if (ref.current) ref.current.volume = Number(e.target.value) * 0.01;
  };

  const handleRepeat = () => {
    setRepeat(!repeat);
  };

  useEffect(() => {
    ref.current?.play();
    dispatch(setIsPlaying(true));
  }, [thisTrack]);

  const handleEnd = () => {
    dispatch(setNextTrack());
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
        {thisTrack && <ProgressBar track={ref.current} />}
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <div className={`${styles.playerBtnPrev} btn`} onClick={previous}>
                <svg className={styles.playerBtnPrevSvg}>
                  <use xlinkHref='/img/icon/sprite.svg#icon-prev'></use>
                </svg>
              </div>
              <div
                className={`${styles.playerBtnPlay} btn`}
                onClick={handlePlay}
              >
                <svg className={styles.playerBtnPlaySvg}>
                  <use
                    xlinkHref={
                      !isPlaying
                        ? '/img/icon/sprite.svg#icon-play'
                        : '/img/icon/sprite.svg#icon-pause '
                    }
                  ></use>
                </svg>
              </div>
              <div className={`${styles.playerBtnNext} btn`} onClick={next}>
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
                onClick={toggleShuffle}
              >
                <svg
                  className={
                    !isShuffle
                      ? styles.playerBtnShuffleSvg
                      : styles.playerBtnShuffleSvgActive
                  }
                >
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
          {thisTrack && <Time track={ref.current} />}
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
