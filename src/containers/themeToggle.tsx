import React, { memo, useContext } from "react";
import { ThemeContext, ThemeType } from "../context/theme.context";

const ThemeToggle = memo(() => {
  const themeData = useContext(ThemeContext);
  return (
    <button
      className="justify-self-center
       m-2 mx-auto self-center transition-all
        text-white bg-black 
        dark:bg-white dark:text-black
        active:bg-red-800
       dark:active:bg-red-200
        border-gray-600 rounded-lg dark:rounded-full 
        duration-100
        p-1"
      onClick={() => themeData.toggleTheme()}
    >
     Make it {themeData.theme==ThemeType.dark?'light':'dark'}
    </button>
  );
});

export default ThemeToggle;
