import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import cartSaga from './saga';
import { CartState, ICart } from './types';

export const initialState: CartState = {
  listCart: [],
  total_item: 0,
  total_page: 0,

  page: 1,
  size: 5,

  updateStatus: false,

  errorMessage: '',
};

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    getCartListRequest(state, action) {},

    setCartData(
      state,
      action: PayloadAction<{
        data: ICart[] | [];
        total_item: number;
        total_page: number;
      }>,
    ) {
      state.listCart = action.payload.data;
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

    getCartDetailRequest(state, action) {},

    updateCartRequest(state, action) {
      state.updateStatus = false;
      state.errorMessage = '';
    },

    setUpdateStatus(state, action: PayloadAction<boolean>) {
      state.updateStatus = action.payload;
    },

    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
});

export const { actions } = slice;

export const useCartSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: cartSaga });
  return { actions: slice.actions };
};
