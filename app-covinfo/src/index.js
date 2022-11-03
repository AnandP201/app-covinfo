import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { ProfileProvider } from "./context/profile.context";
import News from "./pages/News";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProfileProvider>
      <BrowserRouter>
        <Routes>
          <Route index element=<App /> />
          <Route path="news" element=<News /> />
        </Routes>
      </BrowserRouter>
    </ProfileProvider>
  </React.StrictMode>
);
