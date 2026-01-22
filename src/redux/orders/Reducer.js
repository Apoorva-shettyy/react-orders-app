const initialState = {
  list: [],
  loading: false,
  error: null,
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_ORDERS_REQUEST":
    case "UPDATE_ORDER_STATUS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_ORDERS_SUCCESS":
      return {
        ...state,
        loading: false,
        list: action.payload,
      };

    case "UPDATE_ORDER_STATUS_SUCCESS":
      return {
        ...state,
        loading: false,
        list: state.list.map((order) =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order,
        ),
      };

    case "FETCH_ORDERS_FAILURE":
    case "CREATE_ORDER_FAILURE":
    case "UPDATE_ORDER_STATUS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
