'use client';
import React, { useState } from 'react';
import styles from './Filter.module.css';
import DropMenu from './Dropmenu';
import { useAppSelector } from '@/store/store';

type Count = { count: string[] };
type FiltersType = {
  author: string[];
  genre: string[];
};

const Count = ({ count }: Count) => {
  if (!count) return null;
  return <span className={styles.filterActiveRound}>{count.length}</span>;
};

const Filter = () => {
  const { tracks, filters } = useAppSelector(state => state.tracksSlice);
  const { author, genre } = filters;

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const unique = <T, K extends keyof T>(items: T[], property: K): string[] => {
    const uniqValues = new Set<string>();
    items.forEach(item => uniqValues.add(String(item[property])));
    return Array.from(uniqValues);
  };

  const filterYears = ['По умолчанию', 'Сначала новые', 'Сначала старые'];

  const filterBlock = [
    {
      property: 'author',
      title: 'исполнителю',
      list: unique(tracks, 'author'),
    },
    { property: 'year', title: 'году выпуска', list: filterYears },
    { property: 'genre', title: 'жанру', list: unique(tracks, 'genre') },
  ];

  const handleClick = (filter: string): void => {
    setActiveFilter((prev: string | null) => (prev === filter ? null : filter));
  };

  return (
    <div className={styles.centerblockFilter}>
      <div className={styles.filterTitle}>Искать по:</div>
      {filterBlock.map(filter => {
        const filterProperty = filter.property as keyof FiltersType;
        return (
          <div
            key={filter.property}
            className={
              filter.property === activeFilter
                ? styles.filterActive
                : styles.filterButton
            }
            onClick={() => handleClick(filter.property)}
          >
            {filter.title}
            {activeFilter === filter.property && (
              <>
                <Count count={filters[filterProperty]} />
                <DropMenu property={filter.property} list={filter.list} />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
