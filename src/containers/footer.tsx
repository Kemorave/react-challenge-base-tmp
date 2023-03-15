import React, { memo, useContext } from "react";
import { Trans, useTranslation } from "react-i18next";
import { LanguageContext } from "../context/language.context";
import { User } from "../types/user";

const Footer = memo((prop: { user: User | null }) => {
  const language = useContext(LanguageContext);

  //useTranslation();
  return (
    <div className="p-5 self-center flex items-center text-center">
      <Trans values={{ date: new Date() }} i18nKey="dateNow"></Trans>
      <p className="text-gray-700"> &nbsp;|&nbsp; </p>
      {language.supportedLanguages?.map((lng, i) => (
        <a
          className="cursor-pointer mr-2"
          key={lng.code}
          style={{
            fontWeight:
              language.currentLanguage === lng.code ? "bold" : "normal",
          }}
          onClick={async () => await language.changeLanguage(lng.code)}
        >
          {lng.nativeName}
        </a>
      ))}
    </div>
  );
});

export default Footer;
