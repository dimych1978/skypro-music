'use client';

import { useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const user = useAppSelector(state => state.auth);
  const router = useRouter();
  useEffect(() => {
    console.log('user', user);
    router.push('/trackPages/base');
  }, []);

  return null;
}
