import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import productSaga from './saga';
import { ProductState, IProduct } from './types';

export const initialState: ProductState = {
  listProduct: [],
  detailProduct: {
    createAt: null,
    updateAt: null,
    title: '',
    longDescription: '',
    categoryId: -1,
    category: '',
    price: 0,
    author: '',
    currentNumber: 0,
    numberOfPage: 0,
    quantitySelled: 0,
    images: [{ link: '' }],
  },
  total_item: 0,
  total_page: 0,

  page: 1,
  size: 5,

  addStatus: false,
  updateStatus: false,
  deleteStatus: false,

  errorMessage: '',

  uploadImageLink: '',
  upLoadImageStatus: false,
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductListRequest(state, action) {},

    setProductData(
      state,
      action: PayloadAction<{
        data: IProduct[] | [];
        total_item: number;
        total_page: number;
      }>,
    ) {
      state.listProduct = action.payload.data;
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

    getProductDetailRequest(state, action) {},

    setDetailProduct(
      state,
      action: PayloadAction<
        | IProduct
        | {
            createAt: null;
            updateAt: null;
            title: string;
            longDescription: string;
            categoryId: number;
            category: string;
            price: number;
            author: string;
            currentNumber: number;
            numberOfPage: number;
            quantitySelled: number;
            images: [{ link: string }];
          }
      >,
    ) {
      state.detailProduct = action.payload;
    },

    addProductRequest(state, action) {
      state.addStatus = false;
      state.errorMessage = '';
    },

    setAddStatus(state, action: PayloadAction<boolean>) {
      state.addStatus = action.payload;
    },

    updateProductRequest(state, action) {
      state.updateStatus = false;
      state.errorMessage = '';
    },

    setUpdateStatus(state, action: PayloadAction<boolean>) {
      state.updateStatus = action.payload;
    },

    deleteProductRequest(state, action) {
      state.deleteStatus = false;
      state.errorMessage = '';
    },

    setDeleteStatus(state, action: PayloadAction<boolean>) {
      state.deleteStatus = action.payload;
    },

    uploadImageRequest(state, action) {},

    setUploadImageLink(state, action: PayloadAction<string>) {
      state.uploadImageLink = action.payload;
    },

    setErrorMessage(state, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
  },
});

export const { actions } = slice;

export const useProductSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: productSaga });
  return { actions: slice.actions };
};
