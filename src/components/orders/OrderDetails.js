import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardLayout from "../layout/DashboardLayout";
import Loader from "../constants/Loader";
import ErrorBanner from "../constants/ErrorBanner";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { order, loading, error } = useSelector((state) => {
    const order = state.ordersReducer.list.find((o) => o.id === orderId);
    return {
      order,
      loading: state.ordersReducer.loading,
      error: state.ordersReducer.error,
    };
  });

  if (loading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <ErrorBanner message={error} />
      </DashboardLayout>
    );
  }

  if (!order) {
    return (
      <DashboardLayout>
        <p className="text-red-600 font-semibold">Order not found</p>
      </DashboardLayout>
    );
  }

  // Color badge for status
  const statusColor =
    {
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    }[order.status.toLowerCase()] || "bg-gray-100 text-gray-800";

  return (
    <DashboardLayout>
      <button
        className="mb-6 text-blue-600 underline hover:text-blue-800 transition-colors"
        onClick={() => navigate(-1)}
      >
        ← Back to Orders
      </button>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        {/* Order Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
            Order #{order.id}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor}`}
          >
            {order.status}
          </span>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-700 font-medium">Customer:</p>
            <p className="text-gray-900">{order.customerName}</p>
          </div>
        </div>

        {/* Items Table */}
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Items</h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Qty
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {order.items.map((item, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-3 text-gray-900 font-medium">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{item.quantity}</td>
                  <td className="px-4 py-3 text-gray-900 font-semibold">
                    ₹{item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Order Summary */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end gap-4">
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm w-full sm:w-64">
            <p className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span>₹{order.subtotal}</span>
            </p>
            <p className="flex justify-between text-gray-700">
              <span>Tax:</span>
              <span>₹{order.tax}</span>
            </p>
            <p className="flex justify-between text-gray-700">
              <span>Discount:</span>
              <span>₹{order.discount}</span>
            </p>
            <hr className="my-2 border-gray-300" />
            <p className="flex justify-between font-bold text-lg text-gray-900">
              <span>Total:</span>
              <span>₹{order.totalAmount}</span>
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrderDetails;
