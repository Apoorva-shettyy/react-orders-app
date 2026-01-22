import ordersData from "../mock/orders.json";
const STORAGE_KEY = "orders";

export const fetchOrdersApi = () => {
  let orders = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!orders || orders.length === 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ordersData));
    orders = ordersData;
  }
  return orders;
};

export const createOrderApi = (order) => {
  const orders = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const newOrder = {
    ...order,
    id: `ORD-${Date.now()}`,
    createdAt: Date.now(),
    status: "PENDING",
  };

  orders.push(newOrder);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));

  return newOrder;
};

export const updateOrderStatusApi = (orderId, status) => {
  const orders = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const updatedOrders = orders.map((order) =>
    order.id === orderId ? { ...order, status } : order,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));

  return { id: orderId, status };
};

export const syncPendingOrdersApi = () => {
  const orders = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const syncedOrders = orders.map((order) =>
    order.syncPending ? { ...order, syncPending: false } : order,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(syncedOrders));

  return syncedOrders;
};
