import { call, takeLatest, put, all } from 'redux-saga/effects';
import { productService } from 'services/api/productService';
import { actions } from '.';

function* handleGetList(action) {
  try {
    const response = yield call(productService.getList, action.payload);

    yield put(
      actions.setProductData({
        data: response.data.data,
        total_item: response.data.total_item,
        total_page: response.data.total_page,
      }),
    );
  } catch (error) {
    yield put(
      actions.setProductData({
        data: [],
        total_item: 0,
        total_page: 0,
      }),
    );
  }
}

function* handleGetDetailProduct(action) {
  try {
    const res = yield call(productService.getProductByID, action.payload);

    yield put(actions.setDetailProduct(res.data.item));
  } catch (error) {
    yield put(
      actions.setDetailProduct({
        createAt: null,
        updateAt: null,
        title: '',
        longDescription: '',
        categoryId: 0,
        category: '',
        price: 0,
        author: '',
        currentNumber: 0,
        numberOfPage: 0,
        quantitySelled: 0,
        images: [{ link: '' }],
      }),
    );

    yield put(actions.setErrorMessage('Không thể xem chi tiết sản phẩm!'));
  }
}

function* handleAddProduct(action) {
  try {
    yield call(productService.addProduct, action.payload);

    yield put(actions.setAddStatus(true));
  } catch (error) {
    yield put(actions.setErrorMessage('Thêm sản phẩm thất bại!'));
  }
}

function* handleUpdateProduct(action) {
  const { id, data } = action.payload;
  try {
    yield call(productService.updateProduct, id, data);

    yield put(actions.setUpdateStatus(true));
  } catch (error) {
    yield put(actions.setErrorMessage('Cập nhật sản phẩm thất bại!'));
  }
}

function* handleDeleteProduct(action) {
  try {
    yield call(productService.deleteProduct, action.payload);

    yield put(actions.setDeleteStatus(true));
  } catch (error) {
    yield put(actions.setErrorMessage('Xoá sản phẩm thất bại!'));
  }
}

function* handleUploadImage(action) {
  try {
    const res = yield call(productService.upLoadImage, action.payload);

    yield put(actions.setUploadImageLink(res.data.item));
  } catch (error) {
    yield put(actions.setErrorMessage('Tải ảnh thất bại!'));
  }
}

export function* watchHandleGetList() {
  yield takeLatest(actions.getProductListRequest.type, handleGetList);
}

export function* watchHandleGetDetail() {
  yield takeLatest(
    actions.getProductDetailRequest.type,
    handleGetDetailProduct,
  );
}

export function* watchHandleAddProduct() {
  yield takeLatest(actions.addProductRequest.type, handleAddProduct);
}

export function* watchHandleUpdateProduct() {
  yield takeLatest(actions.updateProductRequest.type, handleUpdateProduct);
}

export function* watchHandleDeleteProduct() {
  yield takeLatest(actions.deleteProductRequest.type, handleDeleteProduct);
}

export function* watchHandleUploadImage() {
  yield takeLatest(actions.uploadImageRequest.type, handleUploadImage);
}

export default function* productSaga() {
  yield all([
    watchHandleGetList(),
    watchHandleGetDetail(),
    watchHandleAddProduct(),
    watchHandleUpdateProduct(),
    watchHandleDeleteProduct(),
    watchHandleUploadImage(),
  ]);
}
