import React from 'react'
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { accessToken } = useSelector((state) => state.auth);
  return accessToken ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
