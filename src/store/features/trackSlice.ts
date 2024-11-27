import { getSelectionTracks } from '@/api/selectionApi';
import { SelectType, TrackType } from '@/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  tracks: TrackType[];
  thisTrack: TrackType | null;
  defaultTracks: TrackType[];
  isShuffle: boolean;
  isPlaying: boolean;
  id: number | null;
  isFav: number[];
  selectArray: number[];
  selectTracks: TrackType[];
  selectTitles: string[];
  filters: {
    author: string[];
    genre: string[];
    letters: string;
    sort: string;
  };
};

const initialState: initialStateType = {
  tracks: [],
  thisTrack: null,
  defaultTracks: [],
  isShuffle: false,
  isPlaying: false,
  id: null,
  isFav: [],
  selectArray: [],
  selectTracks: [],
  selectTitles: [],
  filters: { author: [], genre: [], letters: '', sort: 'По умолчанию' },
};

export const addSelectionTracks = createAsyncThunk(
  'selection',
  async (id: string) => {
    return await getSelectionTracks(id);
  }
);

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    resetState: () => initialState,
    setTrackState: (state, action: PayloadAction<TrackType[]>) => {
      state.tracks = action.payload;
      state.defaultTracks = action.payload;
      state.selectTracks = action.payload;
    },

    setThisTrack: (state, action: PayloadAction<TrackType | null>) => {
      state.thisTrack = action.payload;
      if (state.selectArray.length > 0) {
        state.selectTracks = state.tracks.filter(item =>
          state.selectArray.includes(item._id)
        );
        state.defaultTracks = state.tracks.filter(item =>
          state.selectArray.includes(item._id)
        );
      }
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
      const playlist = !state.isShuffle
        ? state.selectTracks
        : state.defaultTracks;

      const index = playlist.findIndex(
        item => item._id === state.thisTrack!._id
      );
      index + 1 <= playlist.length - 1
        ? (state.thisTrack = playlist[index + 1])
        : (state.thisTrack = playlist[playlist.length - 1]);
    },

    setPreviousTrack: state => {
      const playlist = !state.isShuffle
        ? state.selectTracks
        : state.defaultTracks;

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

    setFilters: (
      state,
      action: PayloadAction<{
        author?: string;
        genre?: string;
        sort?: string;
        letters?: string;
      }>
    ) => {
      const authorArray = state.filters.author;
      const genreArray = state.filters.genre;
      if (action.payload.author) {
        !authorArray.includes(action.payload.author)
          ? authorArray.push(action.payload.author)
          : (state.filters.author = authorArray.filter(
              item => item !== action.payload.author
            ));
      }
      if (action.payload.genre) {
        !genreArray.includes(action.payload.genre)
          ? genreArray.push(action.payload.genre)
          : (state.filters.genre = genreArray.filter(
              item => item !== action.payload.genre
            ));
      }
      if (action.payload.sort) {
        state.filters.sort = action.payload.sort;
      }
      if (action.payload.letters !== undefined) {
        state.filters.letters = action.payload.letters;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(
      addSelectionTracks.fulfilled,
      (state, action: PayloadAction<SelectType>) => {
        state.selectArray = action.payload.items;
        state.selectTitles = action.payload.name;
      }
    );
  },
});

export const {
  resetState,
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
  setFilters,
} = trackSlice.actions;
export const TrackReducer = trackSlice.reducer;
