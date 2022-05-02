import { call, takeLatest, put, all } from 'redux-saga/effects';
import { accountService } from 'services/api/accountService';
import { actions } from '.';

function* handleGetList(action) {
  try {
    const response = yield call(accountService.getList, action.payload);

    yield put(
      actions.setAccountData({
        data: response.data.data,
        total_item: response.data.total_item,
        total_page: response.data.total_page,
      }),
    );
  } catch (error) {
    yield put(
      actions.setAccountData({
        data: [],
        total_item: 0,
        total_page: 0,
      }),
    );
  }
}

function* handleGetDetailAccount(action) {
  try {
    const res = yield call(accountService.getAccountByID, action.payload);

    yield put(actions.setDetailAccount(res.data.item));
  } catch (error) {
    yield put(
      actions.setDetailAccount({
        firstName: '',
        lastName: '',
        username: '',
        address: '',
        email: '',
        phone: '',
        role: '',
        createAt: null,
        updateAt: null,
      }),
    );

    yield put(actions.setErrorMessage('Không thể xem chi tiết tài khoản!'));
  }
}

function* handleUpdateAccount(action) {
  const { id, data } = action.payload;
  try {
    yield call(accountService.updateAccount, id, data);

    yield put(actions.setUpdateStatus(true));
  } catch (error) {
    yield put(actions.setErrorMessage('Cập nhật tài khoản thất bại!'));
  }
}

function* handleDeleteAccount(action) {
  try {
    yield call(accountService.deleteAccount, action.payload);

    yield put(actions.setDeleteStatus(true));
  } catch (error) {
    yield put(actions.setErrorMessage('Xoá tài khoản thất bại!'));
  }
}

export function* watchHandleGetList() {
  yield takeLatest(actions.getAccountListRequest.type, handleGetList);
}

export function* watchHandleGetDetail() {
  yield takeLatest(
    actions.getAccountDetailRequest.type,
    handleGetDetailAccount,
  );
}

export function* watchHandleUpdateAccount() {
  yield takeLatest(actions.updateAccountRequest.type, handleUpdateAccount);
}

export function* watchHandleDeleteAccount() {
  yield takeLatest(actions.deleteAccountRequest.type, handleDeleteAccount);
}

export default function* accountSaga() {
  yield all([
    watchHandleGetList(),
    watchHandleGetDetail(),
    watchHandleUpdateAccount(),
    watchHandleDeleteAccount(),
  ]);
}
