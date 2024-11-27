'use client';

import { useAppSelector } from '@/store/store';
import TrackItem from '../TrackItem/TrackItem';
import styles from '@/app/page.module.css';
import { useFilteredTracks } from '@/hooks/useFilteredTracks';

const Select = () => {
  const { selectTitles, tracks, selectArray, filters } = useAppSelector(
    state => state.tracksSlice
  );

  const keysFilter = Object.keys(filters);
  const isFilters = keysFilter.filter(item => item !== 'sort');

  const selectionTracks = tracks.filter(track =>
    selectArray.includes(track._id)
  );
  const { filteredTracks } = useFilteredTracks(selectionTracks);

  const currentTracks = isFilters.length
    ? filteredTracks
      ? filteredTracks
      : []
    : selectionTracks;

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
