'use server';

import styles from './Centerblock.module.css';
import Content from '../Content/Content';
import Filter from '../Filter/Filter';
import Search from '../Search/Search';
import { TrackType } from '@/types';
import { getTracks } from '@/api/trackApi';
import ErrorPage from '@/app/error';

const Centerblock = async () => {
  let tracks: TrackType[] = [];
  try {
    tracks = await getTracks();
  } catch (error: unknown) {
    if (error instanceof Error) {
      ('use server');
      return <ErrorPage error={error.message} reset={(() => {})()} />;
    }
  }

  return (
    <div className={styles.mainCenterblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Filter tracks={tracks} />
      <Content tracks={tracks} />
    </div>
  );
};

export default Centerblock;
