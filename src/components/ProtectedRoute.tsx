import React, { memo, ReactElement, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Constants } from "../app/config/constants";
import { authSelector } from "../features/auth/auth.slice";
import { JWTData } from "../types/auth";
import { User } from "../types/user";

const ProtectedRoute = memo(
  (props: {
    turnPath: string;
    case: "loggedIn" | "loggedOut";
    children: JSX.Element;
  }) => {
    const auth = useSelector(authSelector);
    const navigate = useNavigate();
    useEffect(() => {
      if (!auth.user && props.case == "loggedOut") {
        navigate(props.turnPath, { replace: true });
      } else if (auth.user && props.case == "loggedIn") {
        navigate(props.turnPath, { replace: true });
      }
    }, [auth.user]);
    return props.children;
  }
);

export default ProtectedRoute;
