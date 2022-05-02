import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import categorySaga from './saga';
import { CategoryState, ICategory } from './types';

export const initialState: CategoryState = {
  listCategory: [],
  detailCategory: { name: '', description: '', createAt: null, updateAt: null },
  total_item: 0,
  total_page: 0,

  page: 1,
  size: 5,

  addStatus: false,
  updateStatus: false,
  deleteStatus: false,

  errorMessage: '',
};

const slice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategoryListRequest(state, action) {},

    setCategoryData(
      state,
      action: PayloadAction<{
        data: ICategory[] | [];
        total_item: number;
        total_page: number;
      }>,
    ) {
      state.listCategory = action.payload.data;
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

    getCategoryDetailRequest(state, action) {},

    setDetailCategory(
      state,
      action: PayloadAction<
        | ICategory
        | { name: string; description: string; createAt: null; updateAt: null }
      >,
    ) {
      state.detailCategory = action.payload;
    },

    addCategoryRequest(state, action) {
      state.addStatus = false;
      state.errorMessage = '';
    },

    setAddStatus(state, action: PayloadAction<boolean>) {
      state.addStatus = action.payload;
    },

    updateCategoryRequest(state, action) {
      state.updateStatus = false;
      state.errorMessage = '';
    },

    setUpdateStatus(state, action: PayloadAction<boolean>) {
      state.updateStatus = action.payload;
    },

    deleteCategoryRequest(state, action) {
      state.deleteStatus = false;
      state.errorMessage = '';
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

export const useCategorySlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: categorySaga });
  return { actions: slice.actions };
};
