import React, { memo, ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { Constants } from "../app/config/constants";
import { JWTData } from "../types/auth";
import { User } from "../types/user";

const ProtectedRoute = memo(
  (props: { user: User | null; children: JSX.Element }) => {
    if (!props.user) return <Navigate to={Constants.login} replace />;
    return props.children;
  }
);

export default ProtectedRoute;
