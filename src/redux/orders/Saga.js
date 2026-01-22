import { takeLatest, put, call, delay } from "redux-saga/effects";
import * as types from "./ActionTypes";

import {
  fetchOrdersApi,
  createOrderApi,
  updateOrderStatusApi,
  syncPendingOrdersApi,
} from "../../api/ordersApi";

function* fetchOrdersSaga() {
  try {
    const orders = yield call(fetchOrdersApi);
    yield put({ type: types.FETCH_ORDERS_SUCCESS, payload: orders });
  } catch (error) {
    yield put({ type: types.FETCH_ORDERS_FAILURE, payload: error.message });
  }
}

export default function* ordersSaga() {
  yield takeLatest(types.FETCH_ORDERS_REQUEST, fetchOrdersSaga);
  yield takeLatest(types.UPDATE_ORDER_STATUS_REQUEST, updateOrderStatusSaga);
  yield takeLatest(types.SYNC_PENDING_ORDERS_REQUEST, syncPendingOrdersSaga);
}

// UPDATE ORDER STATUS
function* updateOrderStatusSaga(action) {
  try {
    const { orderId, status } = action.payload;
    yield call(updateOrderStatusApi, orderId, status);
    yield put({
      type: types.UPDATE_ORDER_STATUS_SUCCESS,
      payload: { orderId, status },
    });
  } catch (error) {
    yield put({
      type: types.UPDATE_ORDER_STATUS_FAILURE,
      payload: error.message,
    });
  }
}

function* syncPendingOrdersSaga() {
  try {
    const syncedOrders = yield call(syncPendingOrdersApi);

    yield put({
      type: types.SYNC_PENDING_ORDERS_SUCCESS,
      payload: syncedOrders,
    });
  } catch (error) {
    yield put({
      type: types.SYNC_PENDING_ORDERS_FAILURE,
      payload: error.message,
    });
  }
}
