'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import TrackItem from '../TrackItem/TrackItem';
import { setTrackState } from '@/store/features/trackSlice';
import { useParams } from 'next/navigation';
import { TrackType } from '@/types';

const Select = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.auth);
  const { tracks } = useAppSelector(state => state.tracksSlice);
  const { selectionArray } = useAppSelector(state => state.selectionSlice);
  const selectId: number = +useParams().id;

  const tracksIds = selectionArray.find(item => item._id === selectId)?.items;

  const selectTracks: TrackType[] = [];
  tracksIds?.forEach(track =>
    tracks.filter(item => {
      if (track === item._id) selectTracks.push(item);
    })
  );

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(setTrackState(selectTracks));
      } catch (error) {
        console.warn(error);
      }
    };
    getData();
  }, []);

  return (
    <>
      {selectTracks.length > 0 ? (
        selectTracks.map(track => <TrackItem key={track._id} track={track} />)
      ) : (
        <h2>Эта подборка сейчас пуста.</h2>
      )}
    </>
  );
};

export default Select;
