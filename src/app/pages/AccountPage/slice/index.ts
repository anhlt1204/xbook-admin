import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import accountSaga from './saga';
import { AccountState, IAccount } from './types';

export const initialState: AccountState = {
  listAccount: [],
  detailAccount: {
    firstName: '',
    lastName: '',
    username: '',
    address: '',
    email: '',
    phone: '',
    role: '',
    createAt: null,
    updateAt: null,
  },
  total_item: 0,
  total_page: 0,

  page: 1,
  size: 5,

  updateStatus: false,
  deleteStatus: false,

  errorMessage: '',
};

const slice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    getAccountListRequest(state, action) {},

    setAccountData(
      state,
      action: PayloadAction<{
        data: IAccount[] | [];
        total_item: number;
        total_page: number;
      }>,
    ) {
      state.listAccount = action.payload.data;
      state.total_item = action.payload.total_item;
      state.total_page = action.payload.total_page;
    },

    setPage(state, action: PayloadAction<number>) {
      if (action.payload < 0) {
        state.page = 0;
        return;
      }

      state.page = action.payload;
    },

    getAccountDetailRequest(state, action) {},

    setDetailAccount(
      state,
      action: PayloadAction<
        | IAccount
        | {
            firstName: '';
            lastName: '';
            username: '';
            address: '';
            email: '';
            phone: '';
            role: '';
            createAt: null;
            updateAt: null;
          }
      >,
    ) {
      state.detailAccount = action.payload;
    },

    updateAccountRequest(state, action) {
      state.updateStatus = false;
    },

    setUpdateStatus(state, action: PayloadAction<boolean>) {
      state.updateStatus = action.payload;
    },

    deleteAccountRequest(state, action) {
      state.deleteStatus = false;
    },

    setDeleteStatus(state, action: PayloadAction<boolean>) {
      state.deleteStatus = action.payload;
    },

    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
});

export const { actions } = slice;

export const useAccountSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: accountSaga });
  return { actions: slice.actions };
};
