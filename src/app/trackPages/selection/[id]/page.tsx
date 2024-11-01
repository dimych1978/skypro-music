'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Select from '@/components/Select/Select';
import { useGetTracks } from '@/hooks/useGetTracks';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { addSelectionTracks } from '@/store/features/trackSlice';

type IdType = {
  id: string;
};

function Selection() {
  const dispatch = useAppDispatch();
  const { getAllTracks } = useGetTracks();
  const [title, setTitle] = useState('');
  const { id } = useParams<IdType>();

  useEffect(() => {
    const getData = async () => {
      try {
        await getAllTracks();
        await dispatch(addSelectionTracks(id)).unwrap();
      } catch (error) {
        console.warn(error);
      }
    };
    getData();

    // switch (+id) {
    //   case 2:
    //     setTitle('Плейлист дня');
    //     break;
    //   case 3:
    //     setTitle('100 Танцевальных хитов');
    //     break;
    //   case 4:
    //     setTitle('Инди-заряд');
    //     break;
    // }
  }, []);

  return <Select />;
}
export default Selection;
