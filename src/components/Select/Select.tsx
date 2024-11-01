'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import TrackItem from '../TrackItem/TrackItem';
import { setTrackState } from '@/store/features/trackSlice';
import { useParams } from 'next/navigation';
import { TrackType } from '@/types';
import { useGetTracks } from '@/hooks/useGetTracks';
import styles from '@/app/page.module.css';

const Select = () => {
  const dispatch = useAppDispatch();
  const { getAllTracks } = useGetTracks();
  const { tracks, selectTitles, selectTracks } = useAppSelector(
    state => state.tracksSlice
  );
  const selectId: number = +useParams().id;

  // useEffect(() => {
  // getAllTracks();
  // console.log('tracks', tracks, 'selectionTracks', selectionTracks);
  // tracksIds?.forEach(track =>
  //   tracks.filter(item => {
  //     console.log('track', track, 'item', item);
  //     if (track === item._id) selectTracks.push(item);
  //   })
  // );
  // getAllTracks();
  // console.log('tracks', tracks, 'tracksIds', tracksIds);
  const filterTracks: TrackType[] = tracks.filter(track =>
    selectTracks.includes(track._id)
  );
  // }, [tracks]);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       dispatch(setSelectionTracks(selectTracks));
  //       dispatch(setTrackState(selectTracks));
  //     } catch (error) {
  //       console.warn(error);
  //     }
  //   };
  //   getData();
  // }, []);

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
