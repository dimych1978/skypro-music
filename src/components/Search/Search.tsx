'use client';

import React, { useState } from 'react';
import styles from './Search.module.css';
import { useAppDispatch } from '@/store/store';
import { setFilters } from '@/store/features/trackSlice';

const Search = () => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');

  const changeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const applySearchText = (
    e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<SVGUseElement>
  ) => {
    if (
      e.type === 'click' ||
      (e.type === 'keyup' && 'key' in e && e.key === 'Enter')
    )
      console.log('searchText', searchText);
    dispatch(setFilters({ letters: searchText }));
  };

  return (
    <div className={styles.centerblockSearch}>
      <svg className={styles.searchSvg}>
        <use
          xlinkHref='/img/icon/sprite.svg#icon-search'
          onClick={applySearchText}
          tabIndex={0}
        ></use>
      </svg>
      <input
        className={styles.searchText}
        type='search'
        placeholder='Поиск'
        name='search'
        onChange={changeSearchText}
        onKeyUp={applySearchText}
      />
    </div>
  );
};

export default Search;
