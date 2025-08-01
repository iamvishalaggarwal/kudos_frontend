import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  message: "",
  severity: "warning",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      const { isOpen, message, severity } = action.payload;
      state.isOpen = isOpen;
      state.message = message;
      state.severity = severity;
    },
  },
});

export const selectNotificationIsOpen = (state) => state.notification.isOpen;
export const selectNotificationMessage = (state) => state.notification.message;
export const selectNotificationSeverity = (state) =>
  state.notification.severity;
export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
