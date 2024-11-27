'use client';

import styles from './PlayerBar.module.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ProgressBar, TrackTime } from './ProgressBar';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setIsPlaying,
  setIsShuffle,
  setNextTrack,
  setPreviousTrack,
  setShuffle,
} from '@/store/features/trackSlice';
import { useLikeTrack } from '@/hooks/useLikeTrack';

export type TimeType = {
  min: number;
  sec: number;
  minDuration: number;
  secDuration: number;
};

const PlayerBar = () => {
  const { thisTrack } = useAppSelector(state => state.tracksSlice);
  const { isShuffle, isPlaying } = useAppSelector(state => state.tracksSlice);
  const { isLiked, handleLike } = useLikeTrack(thisTrack ? thisTrack._id : 1);

  const dispatch = useAppDispatch();
  const ref = useRef<HTMLAudioElement>(null!);

  const [backgroundBar, setBackgroundBar] = useState<string>('2e2e2e');
  const [widthBar, setWidthBar] = useState<number>(0);
  const [time, setTime] = useState<TimeType>({
    min: 0,
    sec: 0,
    minDuration: 0,
    secDuration: 0,
  });

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
  }, [isShuffle, dispatch]);

  const handlePlay = () => {
    dispatch(setIsPlaying(!isPlaying));
    !isPlaying ? ref.current?.play() : ref.current?.pause();
  };

  const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.volume = Number(e.target.value) * 0.01;
    }
  };

  const handleRepeat = () => {
    setRepeat(!repeat);
  };

  useEffect(() => {
    ref.current
      ?.play()
      .then(() => {
        ref.current.volume = 0.2;
        dispatch(setIsPlaying(true));
      })
      .catch(error => {
        if (error.name !== 'AbortError') console.warn(error);
      });
  }, [thisTrack, dispatch]);

  const handleEnd = () => {
    dispatch(setNextTrack());
  };

  useEffect(() => {
    if (ref.current)
      repeat ? (ref.current!.loop = true) : (ref.current!.loop = false);
  }, [repeat]);

  if (ref.current) {
    ref.current.oncanplay = () => {
      setTime({
        ...time,
        minDuration: Math.floor(ref.current.duration / 60),
        secDuration: ref.current.duration % 60,
      });
    };

    ref.current.ontimeupdate = () => {
      if (!ref.current) return;
      setWidthBar(
        ref.current.duration
          ? (ref.current.currentTime / ref.current.duration) * 100
          : 0
      );
      setBackgroundBar('#B672FF');
      setTime({
        ...time,
        min: Math.floor(ref.current.currentTime / 60),
        sec:
          ref.current.currentTime % 60 > 0 && ref.current.currentTime % 60 < 1
            ? 0
            : ref.current.currentTime % 60,
      });
    };
  }

  if (!thisTrack) return;

  return (
    <div className={styles.bar}>
      <audio
        ref={ref}
        src={thisTrack.track_file}
        controls
        style={{ display: 'none' }}
        onEnded={handleEnd}
      />
      <div className={styles.barContent}>
        <TrackTime time={time} />
        <ProgressBar
          widthBar={widthBar}
          backgroundBar={backgroundBar}
          setWidthBar={setWidthBar}
          setBackgroundBar={setBackgroundBar}
          track={ref.current}
        />

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
                    {thisTrack.name}
                  </a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink} href='http://'>
                    {thisTrack.author}
                  </a>
                </div>
              </div>

              <div className={styles.trackPlayLikeDis}>
                <div
                  className={`${styles.trackPlayLike} btnIcon`}
                  onClick={handleLike}
                >
                  <svg
                    className={styles.trackPlayLikeSvg}
                    style={isLiked ? { fill: '#fff' } : { fill: '#696969' }}
                  >
                    <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
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
