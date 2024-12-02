import React from "react";
import ReactDOM from "react-dom/client"; // Use "react-dom/client" for createRoot
import App from "./App";
import { ScreenProvider } from "./ScreenContext";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create root

root.render(
  <ScreenProvider>
    <App />
  </ScreenProvider>
);