'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ProgressBar.module.css';

type props = { track: React.RefObject<HTMLAudioElement> };

const ProgressBar = ({ track }: props) => {
  const [backgroundBar, setBackgroundBar] = useState<string>('2e2e2e');
  const [widthBar, setWidthBar] = useState<number>(0);

  type Time = {
    min: number;
    sec: number;
    minDuration: number;
    secDuration: number;
  };

  const [time, setTime] = useState<Time>({
    min: 0,
    sec: 0,
    minDuration: 0,
    secDuration: 0,
  });

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setWidthBar(0);
  }, [track]);

  if (track.current) {
    track.current.ontimeupdate = () => {
      setWidthBar(
        track.current!.duration
          ? (track.current!.currentTime / track.current!.duration) * 100
          : 0
      );
      setBackgroundBar('#B672FF');
      setTime({
        ...time,
        min: track.current!.currentTime / 60,
        sec: track.current!.currentTime % 60,
      });
    };
  }

  if (track.current) {
    track.current.oncanplay = () => {
      setTime({
        ...time,
        minDuration: track.current!.duration / 60,
        secDuration: track.current!.duration % 60,
      });
    };
  }

  const handleTime = (e: React.MouseEvent<HTMLDivElement>) => {
    const widthCurrent: number =
      ((e.clientX - ref.current!.offsetLeft) / ref.current!.offsetWidth) * 100;
    setWidthBar(widthCurrent);
    setBackgroundBar('#B672FF');
    track.current!.currentTime = widthCurrent * track.current!.duration * 0.01;
  };

  return (
    <>
      <div className={styles.time}>
        {time.min.toFixed()}мин. {time.sec.toFixed()}сек. из <br />
        {time.minDuration.toFixed()}.{time.secDuration.toFixed()}
      </div>
      <div
        className={styles.barPlayerProgress}
        ref={ref}
        onClick={e => handleTime(e)}
      >
        <span style={{ width: widthBar + '%', background: backgroundBar }} />
        <span />
      </div>
    </>
  );
};

export default ProgressBar;
