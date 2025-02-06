import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ThemeProvider } from "styled-components"
const lightTheme = {
  primaryColor: "#007bff",
  secondaryColor: "#dc3545",
  borderColor: "#ccc",
  backgroundColor: "#ffffff",
  textColor: "#000000",
  errorColor: "#ff4d4d",
}

const darkTheme = {
  primaryColor: "#66b2ff",
  secondaryColor: "#ff6b6b",
  borderColor: "#444",
  backgroundColor: "#121212",
  textColor: "#ffffff",
  errorColor: "#ff4d4d",
};

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme as "light" | "dark";

    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);
  
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  console.log(`Current theme: ${theme}`);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve essere usato all'interno di ThemeProvider");
  }
  return context;
};
