import React from "react";
import { useRoutes } from "react-router-dom";
import ErrorPage from "../page/error/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
import LoginPage from "../page/login/LoginPage";

const routes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/error", element: <ErrorPage /> },
  { path: "*", element: <PrivateRoutes /> },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
