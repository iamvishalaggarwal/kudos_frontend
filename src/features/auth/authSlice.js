import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/apiSlice";

const initialState = {
  accessToken: localStorage.getItem("access") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { access } = action.payload;
      state.accessToken = access;
      localStorage.setItem("access", access);
    },

    logOut: (state) => {
      state.accessToken = null;
      state.username = null;
      localStorage.removeItem("access");
      apiSlice.util.resetApiState();
    },
  },
});

export const selectAccessToken = (state) => state.auth.accessToken;
export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
