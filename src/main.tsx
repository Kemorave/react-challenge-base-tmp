import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./locale/i18n";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const FirstLoad = () => {
  return (
    <div className="h-[100vh] flex w-full ">
      <div
        className="m-auto  animate-bounce
      flex rounded-lg p-10 bg-black"
      >
        <h1 className="text-white">Loading darkness ...</h1>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter basename="/">
    <Suspense fallback={<FirstLoad />}>
      <Provider store={store}>
        <App />
    </Provider>
      </Suspense>
  </BrowserRouter>
);
