const URL = 'https://webev-music-003b5b991590.herokuapp.com/catalog/track/all';
export const getTracks = async () => {
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error('Ошибка при получении данных');
  }
  const data = await response.json();
  return data.data;
};
