import React, { createContext, useContext, useState } from 'react';


// =====================================================
// CREATE THEME CONTEXT
// =====================================================

const ThemeContext = createContext();


// =====================================================
// THEME PROVIDER
// =====================================================

export function ThemeProvider({ children }) {

  const [darkMode, setDarkMode] = useState(false);


  // ===================================================
  // LIGHT COLORS
  // ===================================================

  const lightTheme = {
    background: '#f8f3f0',
    card: '#ffffff',
    text: '#0d0101',
    secondaryText: '#777777',
    border: '#eeeeee',
    input: '#fafafa',
    primary: '#0d0101',
    primaryText: '#ffffff',
    iconBackground: '#f3e9e2',
  };


  // ===================================================
  // DARK COLORS
  // ===================================================

  const darkTheme = {
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
    secondaryText: '#aaaaaa',
    border: '#333333',
    input: '#2a2a2a',
    primary: '#ffffff',
    primaryText: '#000000',
    iconBackground: '#333333',
  };


  // ===================================================
  // CURRENT THEME
  // ===================================================

  const theme = darkMode
    ? darkTheme
    : lightTheme;


  return (

    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        theme,
      }}
    >

      {children}

    </ThemeContext.Provider>
  );
}


// =====================================================
// USE THEME HOOK
// =====================================================

export function useTheme() {

  return useContext(ThemeContext);

}