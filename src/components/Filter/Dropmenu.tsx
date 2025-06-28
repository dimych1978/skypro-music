'use client';

import { useAppDispatch, useAppSelector } from '@/store/store';
import styles from './Dropmenu.module.css';
import React, { useMemo } from 'react';
import { setFilters } from '@/store/features/trackSlice';
import { useFilteredTracks } from '@/hooks/useFilteredTracks';

type DropMenuProps = { list: string[]; property: string };
const DropMenu: React.FC<DropMenuProps> = ({ list, property }) => {
  const dispatch = useAppDispatch();
  const { filters, selectTracks } = useAppSelector(state => state.tracksSlice);
  const { author, genre, sort } = filters;
  const { filteredTracks } = useFilteredTracks(selectTracks);

  const addFilter = (e: React.MouseEvent) => {
    const text = e.target as HTMLDivElement;
    if (text.textContent) {
      if (property === 'author')
        dispatch(setFilters({ author: text.textContent }));
      if (property === 'genre')
        dispatch(setFilters({ genre: text.textContent }));
      if (property === 'year') dispatch(setFilters({ sort: text.textContent }));
    }
  };

  return (
    <div className={styles.dropMenu}>
      <div className={styles.dropMenuList}>
        {list.map(item => (
          <div key={item}>
            <div
              className={
                author.includes(item) ||
                genre.includes(item) ||
                sort.includes(item)
                  ? styles.dropMenuTextActive
                  : styles.dropMenuText
              }
              onClick={addFilter}
            >
              {item}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropMenu;
