import { all } from "redux-saga/effects";
import ordersSaga from "./orders/Saga";

export default function* rootSaga() {
  yield all([ordersSaga()]);
}
