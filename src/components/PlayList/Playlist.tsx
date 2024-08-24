// 'use client';
import React from 'react';
import styles from './Playlist.module.css';
import { TrackType } from '@/types';

type PlayListProps = {
  tracks: TrackType[];
};

const Playlist: React.FC<PlayListProps> = ({ tracks }) => {
  const unique = tracks.reduce<TrackType[]>((accumulator, current) => {
    if (
      accumulator.findIndex(
        (object: TrackType) => object._id === current._id
      ) === -1
    ) {
      accumulator.push(current);
    }
    return accumulator;
  }, []);

  return (
    <div className={`${styles.contentPlaylist} playlist`}>
      {tracks.map(track => (
        <div key={track._id}>
          <div className={styles.playlistItem}>
            <div className={styles.playlistTrack}>
              <div className={styles.trackTitle}>
                <div className={styles.trackTitleImage}>
                  <svg className={styles.trackTitleSvg}>
                    <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
                  </svg>
                </div>
                <div className='track__title-text'>
                  <a className={styles.trackTitleLink} href='http://'>
                    {track.author}{' '}
                    <span className={styles.trackTitleSpan}></span>
                  </a>
                </div>
              </div>
              <div className={styles.trackAuthor}>
                <a className={styles.trackAuthorLink} href='http://'>
                  {track.album}
                </a>
              </div>
              <div className={styles.trackAlbum}>
                <a className={styles.trackAlbumLink} href='http://'>
                  {track.name}
                </a>
              </div>
              <div className={'track__time'}>
                <svg className={styles.trackTimeSvg}>
                  <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
                </svg>
                <span className={styles.trackTimeText}>
                  {track.duration_in_seconds}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className={styles.playlistItem}>
        <div className={styles.playlistTrack}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
              </svg>
            </div>
            <div className='track__title-text'>
              <a className={styles.trackTitleLink} href='http://'>
                Elektro <span className={styles.trackTitleSpan}></span>
              </a>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <a className={styles.trackAuthorLink} href='http://'>
              Dynoro, Outwork, Mr. Gee
            </a>
          </div>
          <div className={styles.trackAlbum}>
            <a className={styles.trackAlbumLink} href='http://'>
              Elektro
            </a>
          </div>
          <div className='track__time'>
            <svg className={styles.trackTimeSvg}>
              <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
            </svg>
            <span className={styles.trackTimeText}>2:22</span>
          </div>
        </div>
      </div>

      <div className={styles.playlistItem}>
        <div className={styles.playlistTrack}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
              </svg>
            </div>
            <div className='track__title-text'>
              <a className={styles.trackTitleLink} href='http://'>
                I’m Fire <span className={styles.trackTitleSpan}></span>
              </a>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <a className={styles.trackAuthorLink} href='http://'>
              Ali Bakgor
            </a>
          </div>
          <div className={styles.trackAlbum}>
            <a className={styles.trackAlbumLink} href='http://'>
              I’m Fire{' '}
            </a>
          </div>
          <div className='track__time'>
            <svg className={styles.trackTimeSvg}>
              <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
            </svg>
            <span className={styles.trackTimeText}>2:22</span>
          </div>
        </div>
      </div>

      <div className={styles.playlistItem}>
        <div className={styles.playlistTrack}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
              </svg>
            </div>
            <div className='track__title-text'>
              <a className={styles.trackTitleLink} href='http://'>
                Non Stop
                <span className={styles.trackTitleSpan}>(Remix)</span>
              </a>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <a className={styles.trackAuthorLink} href='http://'>
              Стоункат, Psychopath
            </a>
          </div>
          <div className={styles.trackAlbum}>
            <a className={styles.trackAlbumLink} href='http://'>
              Non Stop
            </a>
          </div>
          <div className='track__time'>
            <svg className={styles.trackTimeSvg}>
              <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
            </svg>
            <span className={styles.trackTimeText}>4:12</span>
          </div>
        </div>
      </div>

      <div className={styles.playlistItem}>
        <div className={styles.playlistTrack}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
              </svg>
            </div>
            <div className='track__title-text'>
              <a className={styles.trackTitleLink} href='http://'>
                Run Run
                <span className={styles.trackTitleSpan}>(feat. AR/CO)</span>
              </a>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <a className={styles.trackAuthorLink} href='http://'>
              Jaded, Will Clarke, AR/CO
            </a>
          </div>
          <div className={styles.trackAlbum}>
            <a className={styles.trackAlbumLink} href='http://'>
              Run Run
            </a>
          </div>
          <div className='track__time'>
            <svg className={styles.trackTimeSvg}>
              <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
            </svg>
            <span className={styles.trackTimeText}>2:54</span>
          </div>
        </div>
      </div>

      <div className={styles.playlistItem}>
        <div className={styles.playlistTrack}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
              </svg>
            </div>
            <div className='track__title-text'>
              <a className={styles.trackTitleLink} href='http://'>
                Eyes on Fire
                <span className={styles.trackTitleSpan}>(Zeds Dead Remix)</span>
              </a>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <a className={styles.trackAuthorLink} href='http://'>
              Blue Foundation, Zeds Dead
            </a>
          </div>
          <div className={styles.trackAlbum}>
            <a className={styles.trackAlbumLink} href='http://'>
              Eyes on Fire
            </a>
          </div>
          <div className='track__time'>
            <svg className={styles.trackTimeSvg}>
              <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
            </svg>
            <span className={styles.trackTimeText}>5:20</span>
          </div>
        </div>
      </div>

      <div className={styles.playlistItem}>
        <div className={styles.playlistTrack}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
              </svg>
            </div>
            <div className='track__title-text'>
              <a className={styles.trackTitleLink} href='http://'>
                Mucho Bien
                <span className={styles.trackTitleSpan}>
                  (Hi Profile Remix)
                </span>
              </a>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <a className={styles.trackAuthorLink} href='http://'>
              HYBIT, Mr. Black, Offer Nissim, Hi Profile
            </a>
          </div>
          <div className={styles.trackAlbum}>
            <a className={styles.trackAlbumLink} href='http://'>
              Mucho Bien
            </a>
          </div>
          <div className='track__time'>
            <svg className={styles.trackTimeSvg}>
              <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
            </svg>
            <span className={styles.trackTimeText}>3:41</span>
          </div>
        </div>
      </div>

      <div className={styles.playlistItem}>
        <div className={styles.playlistTrack}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
              </svg>
            </div>
            <div className='track__title-text'>
              <a className={styles.trackTitleLink} href='http://'>
                Mucho Bien
                <span className={styles.trackTitleSpan}>
                  (Hi Profile Remix)
                </span>
              </a>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <a className={styles.trackAuthorLink} href='http://'>
              HYBIT, Mr. Black, Offer Nissim, Hi Profile
            </a>
          </div>
          <div className={styles.trackAlbum}>
            <a className={styles.trackAlbumLink} href='http://'>
              Mucho Bien
            </a>
          </div>
          <div className='track__time'>
            <svg className={styles.trackTimeSvg}>
              <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
            </svg>
            <span className={styles.trackTimeText}>3:41</span>
          </div>
        </div>
      </div>

      {/* <div className='playlist__item'>
        <div className='playlist__track track'>
          <div className='track__title'>
            <div className='track__title-image'>
              <svg className='track__title-svg'>
                <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
              </svg>
            </div>
            <div className='track__title-text'>
              <a className='track__title-link' href='http://'>
                Knives n Cherries
                <span className='track__title-span'></span>
              </a>
            </div>
          </div>
          <div className='track__author'>
            <a className='track__author-link' href='http://'>
              minthaze
            </a>
          </div>
          <div className='track__album'>
            <a className='track__album-link' href='http://'>
              Captivating
            </a>
          </div>
          <div className='track__time'>
            <svg className='track__time-svg'>
              <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
            </svg>
            <span className='track__time-text'>1:48</span>
          </div>
        </div>
      </div>

      <div className='playlist__item'>
        <div className='playlist__track track'>
          <div className='track__title'>
            <div className='track__title-image'>
              <svg className='track__title-svg'>
                <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
              </svg>
            </div>
            <div className='track__title-text'>
              <a className='track__title-link' href='http://'>
                Knives n Cherries
                <span className='track__title-span'></span>
              </a>
            </div>
          </div>
          <div className='track__author'>
            <a className='track__author-link' href='http://'>
              minthaze
            </a>
          </div>
          <div className='track__album'>
            <a className='track__album-link' href='http://'>
              Captivating
            </a>
          </div>
          <div className='track__time'>
            <svg className='track__time-svg'>
              <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
            </svg>
            <span className='track__time-text'>1:48</span>
          </div>
        </div>
      </div>
      <div className='playlist__item'>
        <div className='playlist__track track'>
          <div className='track__title'>
            <div className='track__title-image'>
              <svg className='track__title-svg'>
                <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
              </svg>
            </div>
            <div className='track__title-text'>
              <a className='track__title-link' href='http://'>
                Knives n Cherries
                <span className='track__title-span'></span>
              </a>
            </div>
          </div>
          <div className='track__author'>
            <a className='track__author-link' href='http://'>
              minthaze
            </a>
          </div>
          <div className='track__album'>
            <a className='track__album-link' href='http://'>
              Captivating
            </a>
          </div>
          <div className='track__time'>
            <svg className='track__time-svg'>
              <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
            </svg>
            <span className='track__time-text'>1:48</span>
          </div>
        </div>
      </div>
      <div className='playlist__item'>
        <div className='playlist__track track'>
          <div className='track__title'>
            <div className='track__title-image'>
              <svg className='track__title-svg'>
                <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
              </svg>
            </div>
            <div className='track__title-text'>
              <a className='track__title-link' href='http://'>
                Knives n Cherries
                <span className='track__title-span'></span>
              </a>
            </div>
          </div>
          <div className='track__author'>
            <a className='track__author-link' href='http://'>
              minthaze
            </a>
          </div>
          <div className='track__album'>
            <a className='track__album-link' href='http://'>
              Captivating
            </a>
          </div>
          <div className='track__time'>
            <svg className='track__time-svg'>
              <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
            </svg>
            <span className='track__time-text'>1:48</span>
          </div>
        </div>
      </div>
      <div className='playlist__item'>
        <div className='playlist__track track'>
          <div className='track__title'>
            <div className='track__title-image'>
              <svg className='track__title-svg'>
                <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
              </svg>
            </div>
            <div className='track__title-text'>
              <a className='track__title-link' href='http://'>
                Knives n Cherries
                <span className='track__title-span'></span>
              </a>
            </div>
          </div>
          <div className='track__author'>
            <a className='track__author-link' href='http://'>
              minthaze
            </a>
          </div>
          <div className='track__album'>
            <a className='track__album-link' href='http://'>
              Captivating
            </a>
          </div>
          <div className='track__time'>
            <svg className='track__time-svg'>
              <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
            </svg>
            <span className='track__time-text'>1:48</span>
          </div>
        </div>
      </div>
      <div className='playlist__item'>
        <div className='playlist__track track'>
          <div className='track__title'>
            <div className='track__title-image'>
              <svg className='track__title-svg'>
                <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
              </svg>
            </div>
            <div className='track__title-text'>
              <a className='track__title-link' href='http://'>
                Knives n Cherries
                <span className='track__title-span'></span>
              </a>
            </div>
          </div>
          <div className='track__author'>
            <a className='track__author-link' href='http://'>
              minthaze
            </a>
          </div>
          <div className='track__album'>
            <a className='track__album-link' href='http://'>
              Captivating
            </a>
          </div>
          <div className='track__time'>
            <svg className='track__time-svg'>
              <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
            </svg>
            <span className='track__time-text'>1:48</span>
          </div>
        </div>
      </div>
      <div className='playlist__item'>
        <div className='playlist__track track'>
          <div className='track__title'>
            <div className='track__title-image'>
              <svg className='track__title-svg'>
                <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
              </svg>
            </div>
            <div className='track__title-text'>
              <a className='track__title-link' href='http://'>
                Knives n Cherries
                <span className='track__title-span'></span>
              </a>
            </div>
          </div>
          <div className='track__author'>
            <a className='track__author-link' href='http://'>
              minthaze
            </a>
          </div>
          <div className='track__album'>
            <a className='track__album-link' href='http://'>
              Captivating
            </a>
          </div>
          <div className='track__time'>
            <svg className='track__time-svg'>
              <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
            </svg>
            <span className='track__time-text'>1:48</span>
          </div>
        </div>
      </div>

      <div className='playlist__item'>
        <div className='playlist__track track'>
          <div className='track__title'>
            <div className='track__title-image'>
              <svg className='track__title-svg'>
                <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
              </svg>
            </div>
            <div className='track__title-text'>
              <a className='track__title-link' href='http://'>
                How Deep Is Your Love
                <span className='track__title-span'></span>
              </a>
            </div>
          </div>
          <div className='track__author'>
            <a className='track__author-link' href='http://'>
              Calvin Harris, Disciples
            </a>
          </div>
          <div className='track__album'>
            <a className='track__album-link' href='http://'>
              How Deep Is Your Love
            </a>
          </div>
          <div className='track__time'>
            <svg className='track__time-svg'>
              <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
            </svg>
            <span className='track__time-text'>3:32</span>
          </div>
        </div>
      </div>

      <div className='playlist__item'>
        <div className='playlist__track track'>
          <div className='track__title'>
            <div className='track__title-image'>
              <svg className='track__title-svg'>
                <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
              </svg>
            </div>
            <div className='track__title-text'>
              <a className='track__title-link' href='http://'>
                Morena <span className='track__title-span'></span>
              </a>
            </div>
          </div>
          <div className='track__author'>
            <a className='track__author-link' href='http://'>
              Tom Boxer
            </a>
          </div>
          <div className='track__album'>
            <a className='track__album-link' href='http://'>
              Soundz Made in Romania
            </a>
          </div>
          <div className='track__time'>
            <svg className='track__time-svg'>
              <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
            </svg>
            <span className='track__time-text'>3:36</span>
          </div>
        </div>
      </div>

      <div className='playlist__item'>
        <div className='playlist__track track'>
          <div className='track__title'>
            <div className='track__title-image'>
              <svg className='track__title-svg'>
                <use xlinkHref='/img/icon/sprite.svg#icon-note'></use>
              </svg>
            </div>
            <div className='track__title-text'>
              <a className='track__title-link' href='http://'>
                <span className='track__title-span'></span>
              </a>
            </div>
          </div>
          <div className='track__author'>
            <a className='track__author-link' href='http://'></a>
          </div>
          <div className='track__album'>
            <a className='track__album-link' href='http://'></a>
          </div>
          <div className='track__time'>
            <svg className='track__time-svg'>
              <use xlinkHref='/img/icon/sprite.svg#icon-like'></use>
            </svg>
            <span className='track__time-text'></span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Playlist;
