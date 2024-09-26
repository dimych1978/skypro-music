'use client';

import { useAppSelector } from '@/store/store';
import styles from '../../page.module.css';
import Fav from '@/components/Fav/Fav';
import PlayerBar from '@/components/PlayerBar/PlayerBar';

function Favorite() {
  const { thisTrack } = useAppSelector(state => state.tracksSlice);

  return (
    <>
      <h2 className={styles.centerblock__h2}>Мои треки</h2>
      <Fav />
      {thisTrack && <PlayerBar thisTrack={thisTrack} />}
    </>
  );
}
export default Favorite;
