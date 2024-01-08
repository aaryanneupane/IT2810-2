import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

//Define the type for the context data.
interface ThemeContextType {
  theme: string; //Current theme value
  setTheme: Dispatch<SetStateAction<string>>; //Function to set the theme
}

// Create a context with the specified type and default values
export const ThemeContext = createContext<ThemeContextType>({
  theme: "", // Default theme value is an empty string
  setTheme: () => {}, // Default setTheme function is an empty function
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  // State hook to manage the current theme
  const [theme, setTheme] = useState<string>(""); // Add the default theme here

  // Provide the theme context to the child components
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
