import { useContext, useState } from "react";
import "./App.css";
import { useTranslation, Trans } from "react-i18next";
import { ThemeContext, ThemeType } from "./context/theme.context";
import ThemeToggle from "./containers/themeToggle";
import { Outlet } from "react-router-dom";
import Nav from "./containers/nav";
import { User } from "./types/user";
import Footer from "./containers/footer";

function App(props: { user: User | null }) {
  const [theme, setTheme] = useState(ThemeType.light);
  return (
    <div className={`${theme}`}>
      <ThemeContext.Provider
        value={{
          theme: theme,
          setTheme: setTheme,
          toggleTheme: () => {
            setTheme(
              theme === ThemeType.dark ? ThemeType.light : ThemeType.dark
            );
          },
        }}
      >
        <div className={`h-[100vh] flex flex-col ${theme}`}>
          <Nav user={props.user} />

          <div className="h-full ">
            <Outlet />
          </div>
          <Footer user={props.user} />
        </div>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
