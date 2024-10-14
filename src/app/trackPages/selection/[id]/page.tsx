'use client';

import styles from '@/app/page.module.css';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Select from '@/components/Select/Select';
import { useGetTracks } from '@/hooks/useGetTracks';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  addSelectionTracks,
  setSelectionTracks,
} from '@/store/features/selectionSlice';

function Selection() {
  const dispatch = useAppDispatch();
  const { selectionTracks, selectionArray } = useAppSelector(
    state => state.selectionSlice
  );
  const { getAllTracks } = useGetTracks();
  const [title, setTitle] = useState('');
  const id = useParams().id;

  useEffect(() => {
    console.log(
      '🚀 ~ Selection ~ selectionTracks:',
      selectionTracks,
      'array',
      selectionArray.map(item => item.items)
    );
    // dispatch(setSelectionTracks(selectionArray.map(item => item.items)));
    const getData = async () => {
      try {
        await getAllTracks();
        await dispatch(addSelectionTracks()).unwrap();
        console.log('selectionArray', selectionArray);
      } catch (error) {
        console.warn(error);
      }
    };
    getData();

    switch (+id) {
      case 2:
        setTitle('Плейлист дня');
        break;
      case 3:
        setTitle('100 Танцевальных хитов');
        break;
      case 4:
        setTitle('Инди-заряд');
        break;
    }
  }, []);

  return (
    <>
      <h2 className={styles.centerblock__h2}>{title}</h2>
      <Select />
    </>
  );
}
export default Selection;
