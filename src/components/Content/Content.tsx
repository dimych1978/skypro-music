import styles from './Content.module.css';
import Playlist from '../PlayList/Playlist';
import { TrackType } from '@/types';

type ContentProps = {
  tracks: TrackType[];
};

const Content: React.FC<ContentProps> = ({ tracks }) => {
  return (
    <div className={`${styles.centerblockContent} playlist-content`}>
      <div className={`${styles.contentTitle} playlist-title`}>
        <div className={`${styles.playlistTitleCol} col01`}>Трек</div>
        <div className={`${styles.playlistTitleCol} col02`}>Исполнитель</div>
        <div className={`${styles.playlistTitleCol} col03`}>Альбом</div>
        <div className={`${styles.playlistTitleCol} col04`}>
          <svg className={styles.playlistTitleSvg}>
            <use xlinkHref='/img/icon/sprite.svg#icon-watch'></use>
          </svg>
        </div>
      </div>
      <Playlist tracks={tracks} />
    </div>
  );
};

export default Content;
