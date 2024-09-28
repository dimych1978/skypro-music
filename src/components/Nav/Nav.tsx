'use client';

import Image from 'next/image';
import styles from './Nav.module.css';
import React from 'react';

export const Logo = () => {
  return (
    <div className={styles.navLogo}>
      <Image
        className={styles.logoImage}
        src='/img/logo.png'
        alt='logo'
        width={250}
        height={170}
      />
    </div>
  );
};

export const Nav = () => {
  const [display, setDisplay] = React.useState<string>('none');

  const hideDisplay: React.MouseEventHandler<HTMLDivElement> = () => {
    setDisplay(display === 'inline-block' ? 'none' : 'inline-block');
  };

  return (
    <nav className={styles.mainNav}>
      <Logo />
      <div className={styles.navBurger} onClick={hideDisplay}>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </div>
      <div className={styles.navMenu} style={{ display: display }}>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <a href='/trackPages/base' className={styles.menuLink}>
              Главное
            </a>
          </li>
          <li className={styles.menuItem}>
            <a href='/trackPages/favorite' className={styles.menuLink}>
              Мой плейлист
            </a>
          </li>
          <li className={styles.menuItem}>
            <a href='/entryPages/login' className='menu__link'>
              Войти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
