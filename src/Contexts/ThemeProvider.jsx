import React, { createContext, useState } from "react";

// Create the Theme Context
export const ThemeContext = createContext();

// ThemeProvider Component
export const ThemeProvider = ({ children }) => {
  const [light, setLight] = useState(false);

  return (
    <ThemeContext.Provider value={{ light, setLight }}>
      {children}
    </ThemeContext.Provider>
  );
};
