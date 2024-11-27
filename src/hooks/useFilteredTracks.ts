import { useAppSelector } from '@/store/store';
import { TrackType } from '@/types';
import { useEffect, useMemo, useRef } from 'react';

export const useFilteredTracks = (list: TrackType[]) => {
  const { filters } = useAppSelector(state => state.tracksSlice);

  const authorArray = filters.author;
  const genreArray = filters.genre;

  const prevFiltersRef = useRef(filters.letters);

  useEffect(() => {
    prevFiltersRef.current = filters.letters;
  }, [filters.letters]);

  const filteredTracks = useMemo(() => {
    let tracksToFilter = [...list];
    if (authorArray.length) {
      tracksToFilter = tracksToFilter.filter(track =>
        filters.author.includes(track.author)
      );
    }

    if (genreArray.length) {
      tracksToFilter = tracksToFilter.filter(track =>
        filters.genre.some(item => track.genre.includes(item))
      );
    }

    if (filters.letters) {
      tracksToFilter = tracksToFilter.filter(track =>
        track.name.toLowerCase().includes(filters.letters.toLowerCase())
      );
    } else if (prevFiltersRef.current) {
      tracksToFilter = tracksToFilter.filter(track =>
        track.name.toLowerCase().includes(prevFiltersRef.current.toLowerCase())
      );
    }

    if (filters.sort === 'Сначала новые') {
      tracksToFilter.sort(
        (a, b) => Date.parse(a.release_date) - Date.parse(b.release_date)
      );
    } else if (filters.sort === 'Сначала старые') {
      tracksToFilter.sort(
        (a, b) => Date.parse(b.release_date) - Date.parse(a.release_date)
      );
    } else {
      tracksToFilter = [...list].filter(
        track =>
          (authorArray.length ? authorArray.includes(track.author) : true) &&
          (genreArray.length
            ? genreArray.some(item => track.genre.includes(item))
            : true) &&
          (filters.letters
            ? track.name.toLowerCase().includes(filters.letters.toLowerCase())
            : true)
      );
    }
    return tracksToFilter;
  }, [filters, list]);

  return { filteredTracks };
};
