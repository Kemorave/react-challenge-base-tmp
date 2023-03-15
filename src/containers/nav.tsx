import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { User } from '../types/user';
import ThemeToggle from './themeToggle';

const Nav = memo((props:{user:User|null}) => {
    return (
      <div className="flex px-5 items-center justify-between">
        <h1 className="text-center my-3 uppercase    font-bold ">
          env ==={" "}
          <span className="animate-pulse">
            {import.meta.env.VITE_APP_TITLE}
          </span>
        </h1>
        <ThemeToggle/>
      </div>
    );
});



export default Nav;