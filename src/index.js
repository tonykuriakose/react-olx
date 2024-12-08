import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Firebase } from "./store/Context"; // Wrap with Firebase Context

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Firebase>
    <App />
  </Firebase>
);
