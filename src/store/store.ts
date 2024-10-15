import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { AuthReducer } from './features/authSlice';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';
import { TrackReducer } from './features/trackSlice';
import { SelectionReducer } from './features/selectionSlice';

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      auth: AuthReducer,
      tracksSlice: TrackReducer,
      selectionSlice: SelectionReducer,
    }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppStore: () => AppStore = useStore;
