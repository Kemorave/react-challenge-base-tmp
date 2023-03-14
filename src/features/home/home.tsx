import React, { useContext } from "react";
import { Trans, useTranslation } from "react-i18next";
import ThemeToggle from "../../containers/themeToggle";
import { LanguageContext } from "../../context/language.context";
import i18n from "../../locale/i18n";

const Home = () => {
    const language = useContext(LanguageContext);
 
  return (
    <div
      className=" m-auto 
      flex rounded-lg p-10 flex-col"
    >
      <p className=" text-center">
        <Trans i18nKey="welcome"></Trans>
        <br />
        <Trans values={{ date: new Date() }} i18nKey="dateNow"></Trans>
      </p>

      <ThemeToggle />
      <div className=" self-center">
        {language.supportedLangauges?.map((lng, i) => (
          <button
            key={lng.code}
            style={{
              fontWeight: language.currentLanguage === lng.code ? "bold" : "normal",
            }}
            onClick={async () => await language.changeLanguage(lng.code)}
          >
            {lng.nativeName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
