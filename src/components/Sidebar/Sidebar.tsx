'use client';

import Image from 'next/image';
import styes from './Sidebar.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { errorNull, loginUser } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Sidebar = () => {
  const { username } = useAppSelector(state => state.auth);
  const [user, setUser] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (username) setUser(username);
  }, []);

  const logoutHandler = () => {
    localStorage.clear();
    dispatch(errorNull());
    router.push('/entryPages/login');
  };

  return (
    <div className={styes.mainSidebar}>
      <div className={styes.sidebarPersonal}>
        <p className={styes.sidebarPersonalName}>{user}</p>
        <div className={styes.sidebarIcon} onClick={logoutHandler}>
          <svg>
            <use xlinkHref='/img/icon/sprite.svg#logout'></use>
          </svg>
        </div>
      </div>
      <div className={styes.sidebarBlock}>
        <div className={styes.sidebarList}>
          <div className={styes.sidebarItem}>
            <a className={styes.sidebarLink} href='#'>
              <Image
                className={styes.sidebarImg}
                src='/img/playlist01.png'
                alt="day's playlist"
                width={250}
                height={170}
                priority={true}
              />
            </a>
          </div>
          <div className={styes.sidebarItem}>
            <a className={styes.sidebarLink} href='#'>
              <Image
                className={styes.sidebarImg}
                src='/img/playlist02.png'
                alt="day's playlist"
                width={250}
                height={170}
              />
            </a>
          </div>
          <div className={styes.sidebarItem}>
            <a className={styes.sidebarLink} href='#'>
              <Image
                className={styes.sidebarImg}
                src='/img/playlist03.png'
                alt="day's playlist"
                width={250}
                height={170}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
