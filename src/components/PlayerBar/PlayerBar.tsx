import styles from './PlayerBar.module.css';

const PlayerBar = () => {
  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <div className={styles.barPlayerProgress}></div>
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <div className={`${styles.playerBtnPrev} btn`}>
                <svg className={styles.playerBtnPrevSvg}>
                  <use xlinkHref='/img/icon/sprite.svg#icon-prev'></use>
                </svg>
              </div>
              <div className={`${styles.playerBtnPlay} btn`}>
                <svg className={styles.playerBtnPlaySvg}>
                  <use xlinkHref='/img/icon/sprite.svg#icon-play'></use>
                </svg>
              </div>
              <div className={`${styles.playerBtnNext} btn`}>
                <svg className={styles.playerBtnNextSvg}>
                  <use xlinkHref='/img/icon/sprite.svg#icon-next'></use>
                </svg>
              </div>
              <div className={`${styles.playerBtnRepeat} btnIcon`}>
                <svg className={styles.playerBtnRepeatSvg}>
                  <use xlinkHref='/img/icon/sprite.svg#icon-repeat'></use>
                </svg>
              </div>
              <div className={`${styles.playerBtnShuffle} btnIcon`}>
                <svg className={styles.playerBtnShuffleSvg}>
                  <use xlinkHref='/img/icon/sprite.svg#icon-shuffle'></use>
                </svg>
              </div>
            </div>

            <div className={styles.playerTrackPlay}>
              <div className={styles.trackPlayContain}>
                <div className={styles.trackPlayImage}>
                  <svg className={styles.trackPlaySvg}>
                    <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
                  </svg>
                </div>
                <div className={styles.trackPlayAuthor}>
                  <a className={styles.trackPlayAuthorLink} href='http://'>
                    Ты та...
                  </a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink} href='http://'>
                    Баста
                  </a>
                </div>
              </div>

              <div className={styles.trackPlayLikeDis}>
                <div className={`${styles.trackPlayLike} btnIcon`}>
                  <svg className={styles.trackPlayLikeSvg}>
                    <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
                  </svg>
                </div>
                <div className={`${styles.trackPlayDislike}  btnIcon`}>
                  <svg className={styles.trackPlayDislikeSvg}>
                    <use xlinkHref='/img/icon/sprite.svg#icon-dislike'></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.barVolumeBlock}>
            <div className={styles.volumeContent}>
              <div className={styles.volumeImage}>
                <svg className={styles.volumeSvg}>
                  <use xlinkHref='/img/icon/sprite.svg#icon-volume'></use>
                </svg>
              </div>
              <div className={`${styles.volumeProgress} btn`}>
                <input
                  className={`${styles.volumeProgressLine} btn`}
                  type='range'
                  name='range'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerBar;
