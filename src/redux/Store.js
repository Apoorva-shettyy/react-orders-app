import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./Root.reducer";
import rootSaga from "./Root.saga";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["ordersReducer"],
};

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const enhancer = compose(applyMiddleware(...middleware));

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, enhancer);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
export { persistor };
