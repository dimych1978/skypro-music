'use client';

import { useAppSelector } from '@/store/store';
import TrackItem from '../TrackItem/TrackItem';
import styles from '@/app/page.module.css';

const Select = () => {
  const { selectTitles, tracks, selectArray } = useAppSelector(
    state => state.tracksSlice
  );
  const currentTracks = tracks.filter(track => selectArray.includes(track._id));
  return (
    <>
      <h2 className={styles.centerblock__h2}>{selectTitles}</h2>
      {currentTracks.length > 0 ? (
        currentTracks.map(track => <TrackItem key={track._id} track={track} />)
      ) : (
        <h2>Эта подборка сейчас пуста.</h2>
      )}
    </>
  );
};

export default Select;
