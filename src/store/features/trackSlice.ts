import { TrackType } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  tracks: TrackType[];
  thisTrack: TrackType | null;
  defaultTracks: TrackType[];
  isShuffle: boolean;
  isPlaying: boolean;
  id: number | null;
  isFav: number[];
  selectTracks: TrackType[];
};

const initialState: initialStateType = {
  tracks: [],
  thisTrack: null,
  defaultTracks: [],
  isShuffle: false,
  isPlaying: false,
  id: null,
  isFav: [],
  selectTracks: [],
};

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setTrackState: (state, action: PayloadAction<TrackType[]>) => {
      state.tracks = action.payload;
      state.defaultTracks = action.payload;
    },

    setThisTrack: (state, action: PayloadAction<TrackType | null>) => {
      state.thisTrack = action.payload;
    },

    setFavTracks: (state, action: PayloadAction<TrackType[]>) => {
      const arr: number[] = [];
      action.payload.forEach(item => arr.push(item._id));
      state.isFav = arr;
    },

    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

    setNextTrack: state => {
      const playlist = !state.isShuffle ? state.tracks : state.defaultTracks;

      const index = playlist.findIndex(
        item => item._id === state.thisTrack!._id
      );
      index + 1 <= playlist.length - 1
        ? (state.thisTrack = playlist[index + 1])
        : (state.thisTrack = playlist[playlist.length - 1]);
    },

    setPreviousTrack: state => {
      const playlist = !state.isShuffle ? state.tracks : state.defaultTracks;

      const index = playlist.findIndex(
        item => item._id === state.thisTrack!._id
      );

      index > 1
        ? (state.thisTrack = playlist[index - 1])
        : (state.thisTrack = playlist[0]);
    },

    setShuffle: state => {
      state.defaultTracks.sort(() => Math.random() - 0.5);
    },

    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },

    setLikeTracks: (state, action: PayloadAction<number>) => {
      state.isFav.push(action.payload);
    },

    setDislikeTracks: (state, action: PayloadAction<number>) => {
      state.isFav = state.isFav.filter(el => el !== action.payload);
    },
  },
});

export const {
  setTrackState,
  setThisTrack,
  setFavTracks,
  setNextTrack,
  setPreviousTrack,
  setShuffle,
  setIsShuffle,
  setIsPlaying,
  setLikeTracks,
  setDislikeTracks,
} = trackSlice.actions;
export const TrackReducer = trackSlice.reducer;
