import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import initJPHGetLoader from "./lib/data/loders/jsonPlaceholder/jsonPlaceHolderGetLoader.ts";
import initFirebaseGetLoader from "./lib/data/loders/firebase/firebaseGetLoader.ts";

//setup database managers (DI container)
initJPHGetLoader();
initFirebaseGetLoader();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
