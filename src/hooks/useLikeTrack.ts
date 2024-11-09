import { onDislikeTracks, onLikeTracks } from '@/api/trackApi';
import { addFavoriteTracks } from '@/store/features/authSlice';
import { setDislikeTracks, setLikeTracks } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';

export const useLikeTrack = (id: number) => {
  const dispatch = useAppDispatch();

  const { access, refresh } = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.auth.email);

  const favoriteTracks = useAppSelector(state => state.tracksSlice.isFav);

  const isLiked: boolean = favoriteTracks.some(el => el === id);

  const handleLike = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!access || !refresh || !user) {
      return alert('Зарегистрируйтесь или войдите');
    }

    const action = isLiked ? onDislikeTracks : onLikeTracks;

    if (id)
      try {
        await action(id, access, refresh);
        dispatch(
          addFavoriteTracks({ access: access, refresh: refresh })
        ).unwrap();
        if (isLiked) {
          dispatch(setDislikeTracks(id));
        } else dispatch(setLikeTracks(id));
      } catch (error) {
        console.error(error);
      }
  };
  return { isLiked, handleLike };
};
