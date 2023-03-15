import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./locale/i18n";
import { store } from "./app/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { getRouter } from "./router";
import SplashScreen from "./components/splashScreen";
import { authSelector } from "./features/auth/auth.slice";
import { useLazyGetCurrentUserQuery } from "./services/api.service";
import { updateUser } from "./features/auth/auth.slice";
import { useTranslation } from "react-i18next";
import { LanguageContext, LanguageInfo } from "./context/language.context";

const supportedLanguages: LanguageInfo[] = [
  { nativeName: "English", code: "en" },
  { nativeName: "العربية", code: "ar" },
];
function Index() {
  const { t, i18n } = useTranslation();
  const token = useSelector(authSelector).tokenData;
  const user = useSelector(authSelector).user;
  const dispatch = useDispatch();

  const [loadUser, { data, isLoading, isFetching }] =
    useLazyGetCurrentUserQuery();

  if ((!user && token) || isLoading || isFetching) {
    if (!(isLoading && isFetching)) loadUser(undefined, false);
    return <SplashScreen />;
  }
  useEffect(() => {
    if (data) dispatch(updateUser(data));
  }, [data]);
  const router = getRouter(user ?? null);
  return (
    <LanguageContext.Provider
      value={{
        changeLanguage: async (lan) => {
          await i18n.changeLanguage(lan);
        },
        currentLanguage: i18n.language,
        i18n,
        t,
        supportedLanguages,
      }}
    >
      <RouterProvider router={router} />
    </LanguageContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <Suspense fallback={<SplashScreen />}>
      <Index />
    </Suspense>
  </Provider>
);
