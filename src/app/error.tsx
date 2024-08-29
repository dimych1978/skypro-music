'use client';

import { useEffect } from 'react';
import styles from './error.module.css';
import { useRouter } from 'next/navigation';

export default function ErrorPage({
  error,
  reset,
}: {
  error: (Error & { digest?: string }) | unknown;
  reset: void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Что-то пошло не так</h2>
      <button className={styles.button} onClick={() => router.refresh()}>
        Попробовать снова
      </button>
    </div>
  );
}
