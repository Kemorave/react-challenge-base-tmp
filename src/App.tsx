import { useContext, useState } from "react";
import "./App.css";
import { useTranslation, Trans } from "react-i18next";
import { ThemeContext, ThemeType } from "./context/theme.context";
import ThemeToggle from "./containers/themeToggle";
import { Outlet, useLocation, useOutlet } from "react-router-dom";
import Nav from "./containers/nav";
import { User } from "./types/user";
import Footer from "./containers/footer";
import { AnimatePresence, motion } from "framer-motion";

function AnimatedOutlet() {
  const o = useOutlet();
  const [outlet] = useState(o);

  return outlet;
}
function App(props: { user: User | null }) {
  
  const location = useLocation();
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
            <AnimatePresence mode="popLayout">
              <motion.main
                className="h-[100vh] overflow-clip"
                key={location.pathname}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }} transition={{duration:0.2}}
              >
                <AnimatedOutlet />
              </motion.main>
            </AnimatePresence>
          <Footer user={props.user} />
        </div>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
