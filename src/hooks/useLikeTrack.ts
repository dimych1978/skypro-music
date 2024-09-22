import { onDislikeTracks, onLikeTracks } from '@/api/trackApi';
import { setDislikeTracks, setLikeTracks } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { TrackType } from '@/types';

export const useLikeTrack = (id: number) => {
  const dispatch = useAppDispatch();

  const { access } = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.auth.email);
  const favoriteTracks = useAppSelector(state => state.tracksSlice.isFav);
  const isLiked: boolean = favoriteTracks.some(el => el === id);

  const handleLike = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!access || !user) {
      return alert('Зарегистрируйтесь или войдите');
    }

    const action = isLiked ? onDislikeTracks : onLikeTracks;

    if (id)
      try {
        await action(id, access);
        if (isLiked) {
          dispatch(setDislikeTracks(id));
        } else dispatch(setLikeTracks(id));
      } catch (error) {
        console.log(error);
      }
  };
  return { isLiked, handleLike };
};
