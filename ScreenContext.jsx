import React, { createContext, useState, useContext } from "react";

const ScreenContext = createContext();

export function ScreenProvider({ children }) {
  const [screen, setScreen] = useState("start");

  return (
    <ScreenContext.Provider value={{ screen, setScreen }}>
      {children}
    </ScreenContext.Provider>
  );
}

export function useScreen() {
  return useContext(ScreenContext);
}
