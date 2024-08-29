// 'use client';

import styles from './Dropmenu.module.css';
import React from 'react';

type DropMenuProps = { list: string[] };

const DropMenu: React.FC<DropMenuProps> = ({ list }) => {
  return (
    <div className={styles.dropMenu}>
      <div className={styles.dropMenuList}>
        {list.map(item => (
          <div key={item}>
            <a className={styles.dropMenuText} href='http://'>
              {item}
            </a>
          </div>
        ))}
      </div>
      {/* </> */}
      {/* ) */}
      {/* } */}
    </div>
  );
};

export default DropMenu;
