'use client';
import styles from '../..//page.module.css';
import Entry from '../../../components/entry/entry';
import { useAppSelector } from '@/store/store';

const Login = () => {
  const user = useAppSelector(state => state.auth);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} style={{ height: '100vh' }}>
        <main className={styles.main}>
          <Entry />
        </main>
      </div>
    </div>
  );
};
export default Login;
