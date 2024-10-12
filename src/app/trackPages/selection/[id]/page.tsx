'use client';

import styles from '@/app/page.module.css';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Select from '@/components/Select/Select';
import { useGetTracks } from '@/hooks/useGetTracks';

function Selection() {
  const { getAllTracks } = useGetTracks();
  const [title, setTitle] = useState('');
  const id = useParams().id;

  useEffect(() => {
    getAllTracks();
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
