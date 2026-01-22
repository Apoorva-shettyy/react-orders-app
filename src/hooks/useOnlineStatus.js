import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SYNC_PENDING_ORDERS_REQUEST } from "../redux/orders/ActionTypes";

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      dispatch({ type: SYNC_PENDING_ORDERS_REQUEST });
    };

    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dispatch]);

  return isOnline;
};

export default useOnlineStatus;
