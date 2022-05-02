import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import loginSaga from './saga';
import { IProfile, LoginState } from './types';

export const initialState: LoginState = {
  loading: false,
  success: false,
  errorMessage: '',

  user: null,
};

const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRequest(state, action) {
      state.loading = true;
      state.success = false;
      state.errorMessage = '';
    },

    loginSuccess(state) {
      state.loading = false;
      state.success = true;
    },

    loginFailure(state, action) {
      state.loading = false;
      state.success = false;
      state.errorMessage = action.payload;
    },

    getUserProfileRequest(state) {},

    setUser(state, action: PayloadAction<IProfile | null>) {
      state.user = action.payload;
    },

    outUser(state) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_name');
      state.user = null;
    },
  },
});

export const { actions: loginActions } = slice;

export const useLoginSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: loginSaga });
  return { actions: slice.actions };
};
