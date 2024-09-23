import {
  createUser,
  getToken,
  RegistryUserType,
  signinUser,
  updateToken,
} from '@/api/authApi';
import { getFavoriteTracks } from '@/api/trackApi';
import { TrackType } from '@/types';
import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from '@reduxjs/toolkit';

export type InitialAuthType = {
  authState: boolean;
  email: string | null;
  _id: number | null;
  username: string | null;
  status?: 'loading' | 'rejected' | 'fulfilled';
  error?: string;
  favorite: TrackType[];
  token: {
    access: string | null;
    refresh: string | null;
  };
};

export type TokensType = {
  access: string;
  refresh: string;
};

const initialState: InitialAuthType = {
  authState: false,
  email: typeof window !== 'undefined' ? localStorage.getItem('email') : null,
  _id:
    typeof window !== 'undefined' ? Number(localStorage.getItem('id')) : null,
  username:
    typeof window !== 'undefined' ? localStorage.getItem('username') : null,
  status: undefined,
  error: undefined,
  favorite: [],
  token: {
    access: null,
    refresh:
      typeof window !== 'undefined' ? localStorage.getItem('refresh') : null,
  },
};

const handlerError = (state: any, action: PayloadAction) => {
  state.status = 'rejected';
  state.error = action.payload;
};

export const registryNewUser = createAsyncThunk(
  'user/registry',
  async ({ email, password }: RegistryUserType) => {
    return await createUser({ email, password });
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: RegistryUserType) => {
    return await signinUser({ email, password });
  }
);

export const getTokenThunk = createAsyncThunk(
  'user/token',
  async ({ email, password }: RegistryUserType) => {
    return await getToken({ email, password });
  }
);

export const updateTokenThunk = createAsyncThunk(
  'user/token/update',
  async (refresh: string) => {
    return await updateToken(refresh);
  }
);

export const addFavoriteTracks = createAsyncThunk(
  'user/favorite',
  async (access: string) => {
    return await getFavoriteTracks(access);
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    errorNull(state) {
      state.error = undefined;
    },
  },
  extraReducers: builder => {
    builder.addCase(registryNewUser.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<InitialAuthType>) => {
        console.log('action.payload', action.payload);
        state.status = 'fulfilled';
        state.authState = true;
        state._id = action.payload._id;
        state.email = action.payload.email;
        state.username = action.payload.username;
        if (action.payload.email)
          localStorage.setItem('email', action.payload.email);
        if (action.payload.username)
          localStorage.setItem('username', action.payload.username);
      }
    );

    builder.addCase(
      getTokenThunk.fulfilled,
      (state, action: PayloadAction<TokensType>) => {
        state.token.access = action.payload.access;
        state.token.refresh = action.payload.refresh;
        localStorage.setItem('access', action.payload.access);
        localStorage.setItem('refresh', action.payload.refresh);
      }
    );

    builder.addCase(
      updateTokenThunk.fulfilled,
      (state, action: PayloadAction<string>) => {
        console.log('action.payload', action.payload);
        state.authState = true;
        state.token.access = action.payload;
      }
    );

    builder.addCase(
      addFavoriteTracks.fulfilled,
      (state, action: PayloadAction<TrackType[]>) => {
        const arr: number[] = [];
        action.payload.forEach(el => arr.push(el._id));
        state.favorite = action.payload;
      }
    );

    builder.addCase(registryNewUser.rejected, (state, action) => {
      state.status = 'rejected';

      state.error = action.error.message || '';
      console.log('🚀 ~ builder.addCase ~ state.error:', state.error);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message || '';
      console.log('🚀 ~ builder.addCase ~ state.error:', state.error);
      console.log(action.error);
    });
  },
});

export const { errorNull } = authSlice.actions;
export const AuthReducer = authSlice.reducer;
