'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import TrackItem from '../TrackItem/TrackItem';
import { TrackType } from '@/types';
import styles from '@/app/page.module.css';
import { useGetTracks } from '@/hooks/useGetTracks';
import { useEffect, useState } from 'react';
import { setTrackState } from '@/store/features/trackSlice';

const Select = () => {
  const dispatch = useAppDispatch();
  const { selectTitles, selectTracks } = useAppSelector(
    state => state.tracksSlice
  );

  const [currentTracks, setCurrentTrack] = useState<TrackType[]>([]);

  const { getAllTracks } = useGetTracks();

  useEffect(() => {
    try {
      const getData = async () => {
        const data = (await getAllTracks()) as TrackType[];
        const filteredData = data.filter(track =>
          selectTracks.includes(track._id)
        );
        dispatch(setTrackState(filteredData));
        setCurrentTrack(filteredData);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [selectTracks]);

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
