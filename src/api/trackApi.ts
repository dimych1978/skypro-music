import { TrackType } from '@/types';
import { TokensType } from '../store/features/authSlice';

const URL = 'https://webdev-music-003b5b991590.herokuapp.com/catalog/track';

export const getTracks = async (): Promise<TrackType[]> => {
  const response = await fetch(URL + '/all');
  if (!response.ok) {
    throw new Error('Ошибка при получении данных');
  }
  const data = await response.json();
  return data.data;
};

export const getFavoriteTracks = async (access: string): Promise<[]> => {
  const response = await fetch(URL + '/favorite/all/', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  if (!response.ok) {
    throw new Error('Ошибка при получении данных');
  }
  const data = await response.json();
  return data.data;
};

export const onDislikeTracks = async (
  id: number,
  access: string
): Promise<TrackType[]> => {
  const response = await fetch(`${URL}/${id}/favorite/`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  if (!response.ok) {
    throw new Error('Ошибка при получении данных');
  }
  const data = await response.json();

  return data.data;
};

export const onLikeTracks = async (
  id: number,
  access: string
): Promise<TrackType[]> => {
  const response = await fetch(`${URL}/${id}/favorite/`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });
  if (!response.ok) {
    throw new Error('Ошибка при получении данных');
  }
  const data = await response.json();
  return data.data;
};
