import React from "react";
import { useRoutes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import LoginPage from "../page/login/LoginPage";
import ErrorPage from "../page/error/ErrorPage";

const routes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/", element: <PrivateRoutes /> },
  { path: "*", element: <ErrorPage /> },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
