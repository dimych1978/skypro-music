'use client';

import { useEffect } from 'react';
import Content from '../Content/Content';
import Filter from '../Filter/Filter';
import { useGetTracks } from '@/hooks/useGetTracks';

export default function Centerblock() {
  const { getAllTracks } = useGetTracks();

  useEffect(() => {
    getAllTracks();
  }, []);

  return (
    <>
      <Filter />
      <Content />
    </>
  );
}
