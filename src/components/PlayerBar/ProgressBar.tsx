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
        <span>
          {Number(time.min.toFixed()) < 10
            ? '0' + time.min.toFixed()
            : time.min.toFixed()}
          .
        </span>
        <span>
          {Number(time.sec.toFixed()) < 10
            ? '0' + time.sec.toFixed()
            : time.sec.toFixed()}
          :
        </span>
        <span>
          {Number(time.minDuration.toFixed()) < 10
            ? '0' + time.minDuration.toFixed()
            : time.minDuration.toFixed()}
          .
        </span>
        <span>
          {Number(time.secDuration.toFixed()) < 10
            ? '0' + time.secDuration.toFixed()
            : time.secDuration.toFixed()}
        </span>
      </div>
    </div>
  );
};
