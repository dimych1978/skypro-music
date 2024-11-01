'use client';

import { useAppSelector } from '@/store/store';
import TrackItem from '../TrackItem/TrackItem';
import { TrackType } from '@/types';
import styles from '@/app/page.module.css';

const Select = () => {
  const { tracks, selectTitles, selectTracks } = useAppSelector(
    state => state.tracksSlice
  );

  const filterTracks: TrackType[] = tracks.filter(track =>
    selectTracks.includes(track._id)
  );

  return (
    <>
      <h2 className={styles.centerblock__h2}>{selectTitles}</h2>

      {filterTracks.length > 0 ? (
        filterTracks.map(track => <TrackItem key={track._id} track={track} />)
      ) : (
        <h2>Эта подборка сейчас пуста.</h2>
      )}
    </>
  );
};

export default Select;
