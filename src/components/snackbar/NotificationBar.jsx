import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  selectNotificationIsOpen,
  selectNotificationMessage,
  selectNotificationSeverity,
  setNotification,
} from "../../features/notification/notificationSlice";
import Slide from "@mui/material/Slide";
import { useMediaQuery } from "@mui/material";

const SlideTransition = (props) => {
  return <Slide {...props} direction="left" />;
};

const NotificationBar = () => {
  const isOpen = useSelector(selectNotificationIsOpen);
  const severity = useSelector(selectNotificationSeverity);
  const message = useSelector(selectNotificationMessage);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(
      setNotification({
        isOpen: false,
        message: "",
        severity: "",
      })
    );
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={5000}
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{
            width: "100%",
            color: "white",
            fontSize: isMobile ? "12px" : "14px",
            minWidth: isMobile ? "100px" : "auto",
            maxWidth: "400px",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default NotificationBar;
