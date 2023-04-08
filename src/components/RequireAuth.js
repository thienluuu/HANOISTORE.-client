import { useLocation, Navigate, Outlet } from "react-router-dom";
import { exportFromLocalStorage } from "../utils/localStorage";
import React, { useEffect, useState } from "react";

const RequireAuth = ({ role }) => {
  const location = useLocation();

  let roleId = "";
  let data = exportFromLocalStorage("userData");
  if (data) {
    roleId = data.roleId;
  }
  return roleId && roleId === role ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
