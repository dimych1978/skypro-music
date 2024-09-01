import { TrackType } from '@/types';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  tracks: TrackType[];
  thisTrack: TrackType | null;
  defaultTracks: TrackType[];
  isShuffle: boolean;
  isPlaying: boolean;
};

const initialState: initialStateType = {
  tracks: [],
  thisTrack: null,
  defaultTracks: [],
  isShuffle: false,
  isPlaying: false,
};

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setTrackState: (state, action: PayloadAction<TrackType[]>) => {
      state.tracks = action.payload;
      state.defaultTracks = action.payload;
    },

    setThisTrack: (state, action: PayloadAction<TrackType>) => {
      state.thisTrack = action.payload;
    },

    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },

    setNextTrack: state => {
      const playlist = !state.isShuffle ? state.tracks : state.defaultTracks;

      const index = playlist.findIndex(
        item => item._id === state.thisTrack!._id
      );

      index < playlist.length
        ? (state.thisTrack = playlist[index + 1])
        : (state.thisTrack = playlist[playlist.length]);
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
  },
});

export const {
  setTrackState,
  setThisTrack,
  setNextTrack,
  setPreviousTrack,
  setShuffle,
  setIsShuffle,
  setIsPlaying,
} = trackSlice.actions;
export const TrackReducer = trackSlice.reducer;
