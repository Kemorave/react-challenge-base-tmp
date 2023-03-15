import React, { memo } from "react";
import { User } from "../types/user";
import ThemeToggle from "./themeToggle";
import { NavLink } from "react-router-dom";
import { Constants } from "../app/config/constants";

const Nav = memo((props: { user: User | null }) => {
  return (
    <div className="flex px-5 items-center justify-between">
      <h1 className="text-center my-3 uppercase    font-bold ">
        env ==={" "}
        <span className="animate-pulse">{import.meta.env.VITE_APP_TITLE}</span>
      </h1>
      <div className="flex items-center ">
        {props.user ? (
          <p>{props.user.name}</p>
        ) : (
          <NavLink  className={(isActive)=>isActive.isActive?'hidden': 'block nav-link'} to={Constants.login}>Login</NavLink>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
});

export default Nav;
