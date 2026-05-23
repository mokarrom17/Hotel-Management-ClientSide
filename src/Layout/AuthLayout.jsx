import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../Pages/Authentication/Login/Login";
import SignUp from "../Pages/Authentication/SignUp/SignUp";

const AuthLayout = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
