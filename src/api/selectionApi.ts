import { SelectType } from '@/types';

const URL = 'https://webdev-music-003b5b991590.herokuapp.com/catalog/selection';

export const getSelectionTracks = async (id: string): Promise<SelectType> => {
  const response = await fetch(`${URL}/${id}`);
  if (!response.ok) {
    throw new Error('Ошибка при получении данных');
  }
  const data = await response.json();
  return data.data;
};
