import { onDislikeTracks, onLikeTracks } from '@/api/trackApi';
import { addFavoriteTracks } from '@/store/features/authSlice';
import { setDislikeTracks, setLikeTracks } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { TrackType } from '@/types';

export const useLikeTrack = (id: number) => {
  const dispatch = useAppDispatch();

  const { access, refresh } = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.auth.email);
  const favoriteTracks = useAppSelector(state => state.tracksSlice.isFav);
  // console.log('🚀 ~ useLikeTrack ~ favoriteTracks:', favoriteTracks);
  const isLiked: boolean = favoriteTracks.some(el => el === id);
  // console.log('🚀 ~ useLikeTrack ~ isLiked:', isLiked);

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
        console.log(error);
      }
  };
  return { isLiked, handleLike };
};
