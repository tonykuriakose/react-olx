import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Context } from "./store/Context";
import { app, auth, db } from "./firebase/config"; 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider value={{ app, auth, db }}> 
    <App />
  </Context.Provider>
);







