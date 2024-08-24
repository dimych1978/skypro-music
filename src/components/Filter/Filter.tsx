'use client';
import React from 'react';
import styles from './Filter.module.css';
import DropMenu from './Dropmenu';
import { TrackType } from '@/types';

type FilterProps = {
  tracks: TrackType[];
};

const Filter: React.FC<FilterProps> = ({ tracks }) => {
  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);

  const unique = <T, K extends keyof T>(items: T[], property: K): string[] => {
    const uniqValues = new Set<string>();
    items.forEach(item => uniqValues.add(String(item[property])));
    return Array.from(uniqValues);
  };

  const filterYears = ['По умолчанию', 'Сначала новые', 'Сначала старые'];

  const filters = [
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
      {filters.map(filter => (
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
          {activeFilter === filter.property && <DropMenu list={filter.list} />}
        </div>
      ))}
    </div>
  );
};

export default Filter;
