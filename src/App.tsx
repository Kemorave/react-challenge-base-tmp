import { useContext, useState } from "react";
import "./App.css";
import { useTranslation, Trans } from "react-i18next";
import { ThemeContext, ThemeType } from "./context/theme.context";
import ThemeToggle from "./containers/themeToggle";

const lngs = {
  en: { nativeName: "English" },
  ar: { nativeName: "العربية" },
};
function App() {
  const [theme, setTheme] = useState(ThemeType.dark);
  const { t, i18n } = useTranslation();
  return (
    <div className={` ${theme}`}>
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
        <div className={`h-[100vh] flex ${theme}`}>
          <div
            className=" m-auto 
      flex rounded-lg p-10 flex-col"
          >
            <h1 className="text-center my-3 uppercase    font-bold ">
              env ==={" "}
              <span className="animate-pulse">
                {import.meta.env.VITE_APP_TITLE}
              </span>
            </h1>
            <p className=" text-center">
              <Trans i18nKey="welcome"></Trans>
              <br />
              <Trans values={{ date: new Date() }} i18nKey="dateNow"></Trans>
            </p>

            <ThemeToggle />
            <div className="    self-center">
              {Object.keys(lngs).map((lng, i) => (
                <button
                  key={lng}
                  style={{
                    fontWeight:
                      i18n.resolvedLanguage === lng ? "bold" : "normal",
                  }}
                  onClick={async () => await i18n.changeLanguage(lng)}
                >
                  {(lngs as any)[lng].nativeName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
