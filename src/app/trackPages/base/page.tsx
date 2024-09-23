'use client';

import styles from '../../page.module.css';
import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppSelector } from '@/store/store';

function Base() {
  //   const { thisTrack } = useAppSelector(state => state.tracksSlice);
  //   const dispatch = useAppDispatch();
  //   const { token, favorite, authState } = useAppSelector(state => state.auth);

  //   useEffect(() => {
  //     try {
  //       if (token.refresh) dispatch(updateTokenThunk(token.refresh));
  //       console.log('authState', authState);
  //     } catch (error) {
  //       console.warn(error);
  //     }
  //   }, []);

  //   useEffect(() => {
  //     try {
  //       if (token.access) {
  //         dispatch(addFavoriteTracks(token.access));
  //       }
  //     } catch (error) {
  //       console.warn(error);
  //     }
  //   }, [token.access, dispatch]);
  const user = useAppSelector(state => state.auth);
  console.log('🚀 ~ Base ~ email, authState:', user);

  return (
    <>
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <Centerblock />
      {/* {thisTrack && <PlayerBar thisTrack={thisTrack} />} */}
    </>
  );
}
export default Base;
