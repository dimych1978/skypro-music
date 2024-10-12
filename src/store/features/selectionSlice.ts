import { getSelectionTracks } from '@/api/selectionApi';
import { SelectType, TrackType } from '@/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type InitialSelectionType = {
  selectionArray: SelectType[];
  //   selectionTracks: TrackType[];
};

const initialState: InitialSelectionType = {
  selectionArray: [],
  //   selectionTracks: [],
};

export const addSelectionTracks = createAsyncThunk('selection', async () => {
  return await getSelectionTracks();
});

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    // setSelectionTracks(state, action) {
    //   state.selectionTracks = action.payload;
    // },
  },
  extraReducers: builder => {
    builder.addCase(
      addSelectionTracks.fulfilled,
      (state, action: PayloadAction<SelectType[]>) => {
        const arrayOfSelect = action.payload.map(item => ({
          _id: item._id,
          items: item.items,
        }));
        state.selectionArray = arrayOfSelect;
      }
    );

    builder.addCase(addSelectionTracks.rejected, (state, action) => {
      console.warn(action.error);
    });
  },
});

// export const { setSelectionTracks } = selectionSlice.actions;
export const SelectionReducer = selectionSlice.reducer;
