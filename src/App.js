import { Routes, Route, Navigate } from "react-router-dom";
import OrderTable from "./components/orders/OrderTable";
import OrderList from "./components/orders/OrderList";

import OrderDetails from "./components/orders/OrderDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/orders" />} />
      <Route path="/orders" element={<OrderList />} />
      <Route path="/orders/:orderId" element={<OrderDetails />} />
    </Routes>
  );
}

export default App;
