'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import Select from '@/components/Select/Select';
import { useGetTracks } from '@/hooks/useGetTracks';
import { useAppDispatch } from '@/store/store';
import { addSelectionTracks } from '@/store/features/trackSlice';

type IdType = {
  id: string;
};

function Selection() {
  const dispatch = useAppDispatch();
  const { getAllTracks } = useGetTracks();
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
  }, []);

  return <Select />;
}
export default Selection;
