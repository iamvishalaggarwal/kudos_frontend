import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logOut, setCredentials } from "./features/auth/authSlice";
import { setNotification } from "./features/notification/notificationSlice";
import NotificationBar from "./components/snackbar/NotificationBar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      if (decodedToken.exp * 1000 > Date.now()) {
        // Multiply by 1000 to convert from seconds to milliseconds
        dispatch(
          setCredentials({
            access: accessToken,
          })
        );
      } else {
        dispatch(
          setNotification({
            isOpen: true,
            message:
              "Your session has expired. You have been logged out for security reasons.",
            severity: "error",
          })
        );
        dispatch(logOut());
      }
    }
  }, [dispatch]);

  return (
    <>
      <AppRoutes />
      <NotificationBar />
    </>
  );
};

export default App;
