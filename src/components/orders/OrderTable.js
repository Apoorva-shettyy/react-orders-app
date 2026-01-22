import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const statusColor = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PAID: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const OrderTable = ({ orders, onUpdate, isOnline }) => {
  const orderFormRef = useRef(null);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Orders</h2>
      </div>

      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-[#E6EDF2]">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customerName}</td>
                <td className="p-3">₹{order.totalAmount || "--"}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      statusColor[order.status]
                    }`}
                  >
                    {order.status}
                    {order.syncPending && " (Sync Pending)"}
                  </span>
                </td>

                <td className="p-3 space-x-2">
                  <button
                    disabled={!isOnline || order.syncPending}
                    onClick={() => onUpdate(order.id, "PAID")}
                    className="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50"
                  >
                    Mark Paid
                  </button>

                  <button
                    disabled={!isOnline || order.syncPending}
                    onClick={() => onUpdate(order.id, "CANCELLED")}
                    className="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    View{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderTable;
