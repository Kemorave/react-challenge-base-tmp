import { Root } from "postcss";
import { Suspense, useState } from "react";
import { Trans } from "react-i18next";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  useOutlet,
} from "react-router-dom";
import App from "../App";
import { Constants } from "../app/config/constants";
import { store } from "../app/store";
import ProtectedRoute from "../components/ProtectedRoute";
import SplashScreen from "../components/splashScreen";
import ThemeToggle from "../containers/themeToggle";
import Login from "../features/auth/login";
import Home from "../features/home/home";
import ProfilePage from "../features/profile/profilePage";
import NotFoundPage from "../pages/notFoundPage";
import { JWTData } from "../types/auth";
import { User } from "../types/user";

export function getRouter(user: User | null) {
  return createBrowserRouter(
    createRoutesFromElements(
      <Route path={Constants.home} element={<App user={user} />}>
        <Route index element={<Home />} />
        <Route
          path={Constants.login}
          element={
            <ProtectedRoute case="loggedIn" turnPath={Constants.profile}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path={Constants.profile}
          element={
            <ProtectedRoute case="loggedOut" turnPath={Constants.login}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    ),
    { basename: import.meta.env.VITE_BASE_URL }
  );
}
