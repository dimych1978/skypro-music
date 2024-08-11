import Image from 'next/image';
import styes from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styes.mainSidebar}>
      <div className={styes.sidebarPersonal}>
        <p className={styes.sidebarPersonalName}>Sergey.Ivanov</p>
        <div className={styes.sidebarIcon}>
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
