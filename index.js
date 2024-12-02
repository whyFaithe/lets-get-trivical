import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { ScreenProvider } from "./ScreenContext";

ReactDOM.render(
    <ScreenProvider>
        <App />
    </ScreenProvider>
, document.getElementById("root"))