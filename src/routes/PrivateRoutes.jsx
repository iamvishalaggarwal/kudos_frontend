import React from "react";
import { useRoutes } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
import Home from "../page/home/Home";
import Users from "../page/users/Users";

const privateRoutes = [
  {
    path: "",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "users",
    element: (
      <ProtectedRoute>
        <Users />
      </ProtectedRoute>
    ),
  },
];

const PrivateRoutes = () => {
  const routes = useRoutes(privateRoutes);
  return routes;
};

export default PrivateRoutes;
