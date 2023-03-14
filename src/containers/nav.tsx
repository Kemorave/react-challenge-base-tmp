import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { User } from '../types/user';

const Nav = memo((props:{user:User|null}) => {
    return (
      <div className="flex p-5">
        <h1 className="text-center my-3 uppercase    font-bold ">
          env ==={" "}
          <span className="animate-pulse">
            {import.meta.env.VITE_APP_TITLE}
          </span>
        </h1>
      </div>
    );
});



export default Nav;