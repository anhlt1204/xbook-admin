import { call, takeLatest, put, all } from 'redux-saga/effects';
import { categoryService } from 'services/api/categoryService';
import { actions } from '.';

function* handleGetList(action) {
  try {
    const response = yield call(categoryService.getList, action.payload);

    yield put(
      actions.setCategoryData({
        data: response.data.data,
        total_item: response.data.total_item,
        total_page: response.data.total_page,
      }),
    );
  } catch (error) {
    yield put(
      actions.setCategoryData({
        data: [],
        total_item: 0,
        total_page: 0,
      }),
    );
  }
}

function* handleGetDetailCategory(action) {
  try {
    const res = yield call(categoryService.getCategoryByID, action.payload);

    yield put(actions.setDetailCategory(res.data.item));
  } catch (error) {
    yield put(
      actions.setDetailCategory({
        name: '',
        description: '',
        createAt: null,
        updateAt: null,
      }),
    );

    yield put(actions.setErrorMessage('Không thể xem chi tiết danh mục!'));
  }
}

function* handleAddCategory(action) {
  try {
    yield call(categoryService.addCategory, action.payload);

    yield put(actions.setAddStatus(true));
  } catch (error) {
    yield put(actions.setErrorMessage('Thêm danh mục thất bại!'));
  }
}

function* handleUpdateCategory(action) {
  const { id, data } = action.payload;
  try {
    yield call(categoryService.updateCategory, id, data);

    yield put(actions.setUpdateStatus(true));
  } catch (error) {
    yield put(actions.setErrorMessage('Cập nhật danh mục thất bại!'));
  }
}

function* handleDeleteCategory(action) {
  try {
    yield call(categoryService.deleteCategory, action.payload);

    yield put(actions.setDeleteStatus(true));
  } catch (error) {
    yield put(actions.setErrorMessage('Xoá danh mục thất bại!'));
  }
}

export function* watchHandleGetList() {
  yield takeLatest(actions.getCategoryListRequest.type, handleGetList);
}

export function* watchHandleGetDetail() {
  yield takeLatest(
    actions.getCategoryDetailRequest.type,
    handleGetDetailCategory,
  );
}

export function* watchHandleAddCategory() {
  yield takeLatest(actions.addCategoryRequest.type, handleAddCategory);
}

export function* watchHandleUpdateCategory() {
  yield takeLatest(actions.updateCategoryRequest.type, handleUpdateCategory);
}

export function* watchHandleDeleteCategory() {
  yield takeLatest(actions.deleteCategoryRequest.type, handleDeleteCategory);
}

export default function* categorySaga() {
  yield all([
    watchHandleGetList(),
    watchHandleGetDetail(),
    watchHandleAddCategory(),
    watchHandleUpdateCategory(),
    watchHandleDeleteCategory(),
  ]);
}
