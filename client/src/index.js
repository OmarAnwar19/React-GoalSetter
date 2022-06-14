import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

//router imports, so we can navigate between pages
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import our provider, so we can set the redux store for the app
import { Provider } from "react-redux";
import { store } from "./app/store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <div className="App">
    {/* render our app with store as the import */}
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </div>
);
