import type { Metadata } from 'next';
import { Nav } from '@/components/Nav/Nav';
import styles from '../page.module.css';
import Search from '@/components/Search/Search';
import Sidebar from '@/components/Sidebar/Sidebar';
import PlayerBar from '@/components/PlayerBar/PlayerBar';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Nav />
        <div className={styles.mainCenterblock}>
          <Search />
          {children}
        </div>
        <Sidebar />
        <PlayerBar />
      </main>
    </div>
  );
}
