'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ProgressBar.module.css';

type props = {
  widthBar: number;
  backgroundBar: string;
  setWidthBar: Dispatch<SetStateAction<number>>;
  setBackgroundBar: () => void;
};

export const ProgressBar = ({
  widthBar,
  backgroundBar,
  setWidthBar,
  setBackgroundBar,
}: props) => {
  // const [backgroundBar, setBackgroundBar] = useState<string>('2e2e2e');
  // const [widthBar, setWidthBar] = useState<number>(0);

  const ref = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   setWidthBar(0);
  // }, [track]);

  // update = () => {
  //   console.log('object');
  //   setWidthBar(
  //     track!.duration ? (track!.currentTime / track!.duration) * 100 : 0
  //   );
  //   setBackgroundBar('#B672FF');
  // };
  console.log('widthBar', widthBar);

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

// export const Time = ({ track, update }: props) => {
//   type Time = {
//     min: number;
//     sec: number;
//     minDuration: number;
//     secDuration: number;
//   };

//   const [time, setTime] = useState<Time>({
//     min: 0,
//     sec: 0,
//     minDuration: 0,
//     secDuration: 0,
//   });

//   if (track) {
//     track.oncanplay = () => {
//       setTime({
//         ...time,
//         minDuration: track!.duration / 60,
//         secDuration: track!.duration % 60,
//       });
//     };
//   }

//   if (track) {
//     update = () => {
//       setTime({
//         ...time,
//         min: track!.currentTime / 60,
//         sec: track!.currentTime % 60,
//       });
//     };
//   }

//   return (
//     <div className={styles.playerTime}>
//       <div className={styles.time}>
//         {time.min.toFixed()}мин. {time.sec.toFixed()}сек. из <br />
//         {time.minDuration.toFixed()}.{time.secDuration.toFixed()}
//       </div>
//     </div>
//   );
// };
