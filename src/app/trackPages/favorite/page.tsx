'use client';

import { useAppSelector } from '@/store/store';
import styles from '../../page.module.css';
import Fav from '@/components/Fav/Fav';

function Favorite() {
  const user = useAppSelector(state => state.auth);
  console.log('🚀 ~ Favorite ~ user:', user);
  return (
    <>
      <h2 className={styles.centerblock__h2}>Мои треки</h2>
      <Fav />
    </>
  );
}
export default Favorite;
