import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import initJPHGetLoader from "./lib/data/loders/jsonPlaceholder/jsonPlaceHolderGetLoader.ts";

//setup the jsonplaceholder loader
initJPHGetLoader();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
