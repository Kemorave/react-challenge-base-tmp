import { useContext } from "react";
import { Trans } from "react-i18next";
import ThemeToggle from "../../components/themeToggle";
import { LanguageContext } from "../../context/language.context";

const Home = () => {
  const language = useContext(LanguageContext);

  return (
    <section className="h-full flex ">
      <div
        className=" m-auto 
      flex rounded-lg p-10  flex-col"
      >
        <p className=" text-center">
          <Trans i18nKey="welcome"></Trans>
          <br />
          <Trans values={{ date: new Date() }} i18nKey="dateNow"></Trans>
        </p>

        <ThemeToggle />
        <div className=" self-center">
          {language.supportedLanguages?.map((lng) => (
            <button
              key={lng.code}
              style={{
                fontWeight:
                  language.currentLanguage === lng.code ? "bold" : "normal",
              }}
              onClick={async () => await language.changeLanguage(lng.code)}
            >
              {lng.nativeName}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
