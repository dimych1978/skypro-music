'use client';

import { useAppSelector } from '@/store/store';
import styles from '../../page.module.css';
import Fav from '@/components/Fav/Fav';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function Favorite() {
  const router = useRouter();
  const [user, setUser] = useState(false);

  const { token } = useAppSelector(state => state.auth);

  useEffect(() => {
    setUser(true);
  }, []);

  return (
    <>
      <h2 className={styles.centerblock__h2}>Мои треки</h2>
      {user && token.access ? (
        <Fav />
      ) : (
        <>
          <span
            className={styles.span}
            onClick={() => router.push('/entryPages/registry')}
          >
            Зарегистрируйтесь&ensp;
          </span>
          или&ensp;
          <span
            className={styles.span}
            onClick={() => router.push('/entryPages/login')}
          >
            войдите
          </span>
        </>
      )}
    </>
  );
}
export default Favorite;
