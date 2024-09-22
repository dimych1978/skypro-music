'use client';

import styles from '../../page.module.css';
import Fav from '@/components/Fav/Fav';

function Favorite() {
  return (
    <>
      <h2 className={styles.centerblock__h2}>Мои треки</h2>
      <Fav />
    </>
  );
}
export default Favorite;
