import { combineReducers } from "redux";
import ordersReducer from "./orders/Reducer";

const rootReducer = combineReducers({
  ordersReducer,
});

export default rootReducer;
