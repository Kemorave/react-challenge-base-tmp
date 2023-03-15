import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./locale/i18n";
import { store } from "./app/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getRouter } from "./router";
import SplashScreen from "./components/splashScreen";
import { authSelector, logOut } from "./features/auth/auth.slice";
import { useLazyGetCurrentUserQuery } from "./services/api.service";
import { updateUser } from "./features/auth/auth.slice";
import { useTranslation } from "react-i18next";
import { LanguageContext, LanguageInfo } from "./context/language.context";
import { isNetworkError } from "./util/fetchErrorUtil";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

const supportedLanguages: LanguageInfo[] = [
  { nativeName: "English", code: "en" },
  { nativeName: "العربية", code: "ar" },
];
function Index() {
  const { t, i18n } = useTranslation();
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  const [loadUser, { data, isLoading, isError, error, isFetching }] =
    useLazyGetCurrentUserQuery();
  useEffect(() => {
    console.log(data);
    console.log(auth.tokenData);
    if (isError && !isNetworkError(error as FetchBaseQueryError)) {
      dispatch(logOut());
      return;
    }
    if (!(isLoading && isFetching) && auth.tokenData)
      loadUser(undefined, false);
    if (data) dispatch(updateUser(data));
  }, [data, error]);

  const token = auth.tokenData;
  const user = auth.user;

  if ((!user && token) || isLoading || isFetching) {
    return <SplashScreen />;
  }

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
