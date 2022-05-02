import { call, takeLatest, put, all } from 'redux-saga/effects';
import { authService } from 'services/api/authService';
import { loginActions as actions } from '.';
import { isEmpty } from 'lodash';

function* handleLogin(action) {
  try {
    const response = yield call(authService.login, action.payload);

    if (response.data.role === 'USER') {
      throw Error('Not admin');
    }

    localStorage.setItem('access_token', response.data.token);

    const res = yield call(authService.getCurrentProfile);

    yield put(actions.setUser(res.data.item));

    yield put(actions.loginSuccess());
  } catch (error: any) {
    if (error.message === 'Not admin') {
      yield put(actions.loginFailure('Not admin'));
      return;
    }

    yield put(
      actions.loginFailure(
        isEmpty(error.response.data.message)
          ? 'error'
          : error.response.data.message,
      ),
    );
  }
}

function* handleGetUserProfile() {
  try {
    const response = yield call(authService.getCurrentProfile);

    yield put(actions.setUser(response.data.item));
  } catch (error: any) {
    yield put(actions.outUser());
    window.location.href = '/login';
  }
}

export function* watchHandleLogin() {
  yield takeLatest(actions.loginRequest.type, handleLogin);
}

export function* watchHandleGetUserProfile() {
  yield takeLatest(actions.getUserProfileRequest.type, handleGetUserProfile);
}

export default function* loginSaga() {
  yield all([watchHandleLogin(), watchHandleGetUserProfile()]);
}
