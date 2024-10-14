'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import TrackItem from '../TrackItem/TrackItem';
import { setTrackState } from '@/store/features/trackSlice';
import { useParams } from 'next/navigation';
import { TrackType } from '@/types';
import {
  addSelectionTracks,
  setSelectionTracks,
} from '@/store/features/selectionSlice';
import { useGetTracks } from '@/hooks/useGetTracks';

const Select = () => {
  const dispatch = useAppDispatch();
  const { getAllTracks } = useGetTracks();
  const { tracks } = useAppSelector(state => state.tracksSlice);
  const { selectionArray, selectionTracks } = useAppSelector(
    state => state.selectionSlice
  );
  const selectId: number = +useParams().id;

  const tracksIds = selectionArray.find(item => item._id === selectId)?.items;

  const selectTracks: TrackType[] = [];
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
  tracks.filter(item => {
    tracksIds?.some(x => x === item._id && selectTracks.push(item));
  });
  // }, [tracks]);

  useEffect(() => {
    const getData = async () => {
      try {
        await dispatch(addSelectionTracks()).unwrap();
        dispatch(setSelectionTracks(selectTracks));
        dispatch(setTrackState(selectTracks));
      } catch (error) {
        console.warn(error);
      }
    };
    getData();
    console.log(
      'selectionTracks',
      selectionTracks,
      'selectionArray',
      selectionArray
    );
  }, []);

  return (
    <>
      {selectionTracks.length > 0 ? (
        selectionTracks.map(track => (
          <TrackItem key={track._id} track={track} />
        ))
      ) : (
        <h2>Эта подборка сейчас пуста.</h2>
      )}
    </>
  );
};

export default Select;
