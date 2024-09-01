'use client';

import { useRef } from 'react';
import styles from './ProgressBar.module.css';
import { TimeType } from './PlayerBar';

type props = {
  widthBar?: number;
  backgroundBar?: string;
  setWidthBar: React.Dispatch<React.SetStateAction<number>>;
  setBackgroundBar: React.Dispatch<React.SetStateAction<string>>;
  track?: HTMLAudioElement;
};

type timeProps = { time: TimeType };

export const ProgressBar = ({
  widthBar,
  backgroundBar,
  setWidthBar,
  setBackgroundBar,
  track,
}: props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleTime = (e: React.MouseEvent<HTMLDivElement>) => {
    const widthCurrent: number =
      ((e.clientX - ref.current!.offsetLeft) / ref.current!.offsetWidth) * 100;
    setWidthBar(widthCurrent);
    setBackgroundBar('#B672FF');
    track!.currentTime = widthCurrent * track!.duration * 0.01;
  };

  return (
    <div
      className={styles.barPlayerProgress}
      ref={ref}
      onClick={e => handleTime(e)}
    >
      <span style={{ width: widthBar + '%', background: backgroundBar }} />
      <span />
    </div>
  );
};

export const TrackTime = ({ time }: timeProps) => {
  return (
    <div className={styles.playerTime}>
      <div className={styles.time}>
        {time.min.toFixed()} мин.{time.sec.toFixed()} сек. <br /> из <br />
        {time.minDuration.toFixed()} мин.{time.secDuration.toFixed()} сек.
      </div>
    </div>
  );
};
