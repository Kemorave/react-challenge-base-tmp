import i18next, { i18n, t, TFunction } from "i18next";
import { createContext } from "react";

export interface LanguageInfo {
  nativeName: string;
  code: string;
}
export interface LanguageData {
  currentLanguage: string;
  supportedLangauges?: LanguageInfo[];
  changeLanguage: (lang: string) => Promise<void>;
  t: TFunction<"Translation", undefined, "Translation">;
  i18n: i18n;
}
let testinit: LanguageData = {
  i18n: i18next,
  t: t,
  changeLanguage: (a) => {
    console.log(`language is set to ${a}`);
    return Promise.resolve();
  },
  currentLanguage: "en",
};
export const LanguageContext = createContext(testinit);
