import { call, takeLatest, put, all } from 'redux-saga/effects';
import { cartService } from 'services/api/cartService';
import { actions } from '.';

function* handleGetList(action) {
  try {
    const response = yield call(cartService.getList, action.payload);

    console.log(response);

    yield put(
      actions.setCartData({
        data: response.data.data,
        total_item: response.data.total_item,
        total_page: response.data.total_page,
      }),
    );
  } catch (error) {
    yield put(
      actions.setCartData({
        data: [],
        total_item: 0,
        total_page: 0,
      }),
    );
  }
}

function* handleUpdateCart(action) {
  try {
    yield call(cartService.updateCart, action.payload);

    yield put(actions.setUpdateStatus(true));
  } catch (error) {
    yield put(actions.setErrorMessage('Cập nhật đơn hàng thất bại!'));
  }
}

export function* watchHandleGetList() {
  yield takeLatest(actions.getCartListRequest.type, handleGetList);
}

export function* watchHandleUpdateCart() {
  yield takeLatest(actions.updateCartRequest.type, handleUpdateCart);
}

export default function* cartSaga() {
  yield all([watchHandleGetList(), watchHandleUpdateCart()]);
}
