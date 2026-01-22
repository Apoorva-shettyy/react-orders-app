import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_ORDERS_REQUEST } from "../../redux/orders/ActionTypes";
import { UPDATE_ORDER_STATUS_REQUEST } from "../../redux/orders/ActionTypes";
import useOnlineStatus from "../../hooks/useOnlineStatus";
import DashboardLayout from "../layout/DashboardLayout";
import Loader from "../constants/Loader";
import ErrorBanner from "../constants/ErrorBanner";
import OrderTable from "./OrderTable";
import "./orders.css";

const OrderList = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const { list, loading, error } = useSelector((state) => state.ordersReducer);
  const isOnline = useOnlineStatus();

  //search functionality
  const filteredOrders = useMemo(() => {
    return list.filter((order) => {
      const term = searchTerm.toLowerCase();

      return (
        (order.id && order.id.toLowerCase().includes(term)) ||
        (order.customerName &&
          order.customerName.toLowerCase().includes(term)) ||
        (order.status && order.status.toLowerCase().includes(term)) ||
        (order.createdAt &&
          new Date(order.createdAt)
            .toLocaleDateString()
            .toLowerCase()
            .includes(term))
      );
    });
  }, [list, searchTerm]);

  //pagination calculations
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOrders, currentPage]);

  useEffect(() => {
    dispatch({ type: FETCH_ORDERS_REQUEST });
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <DashboardLayout>
      {loading && <Loader />}
      <ErrorBanner message={error} />
      {!isOnline && (
        <p className="text-red-600 mb-4">
          You are offline. Orders will sync when online.
        </p>
      )}

      {/* Search Bar */}
      <div className="flex justify-end items-center mb-4">
        <input
          type="text"
          placeholder="Search...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-50 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Orders Table */}
      <OrderTable
        orders={paginatedOrders}
        isOnline={isOnline}
        onUpdate={(id, status) =>
          dispatch({
            type: UPDATE_ORDER_STATUS_REQUEST,
            payload: { orderId: id, status },
          })
        }
      />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-evenly items-center gap-3 mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* No Results */}
      {filteredOrders.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No orders found</p>
      )}
    </DashboardLayout>
  );
};

export default OrderList;
