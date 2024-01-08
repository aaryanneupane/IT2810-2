import { useState } from "react";
import Toggle from "react-toggle";
import "./styles/Toggle.css";
import { useMediaQuery } from "react-responsive";
import { ThemeContext } from "./context/Theme";
import { useContext, KeyboardEvent, useEffect } from "react";

/* 
This is the toggle component. It is used on all pages to toggle between dark and light mode.
*/

const DarkModeToggle: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const prefersDark = useMediaQuery({ query: "(prefers-color-scheme: dark)" });
  const [isDark, setIsDark] = useState(() => {
    return prefersDark || theme === "dark";
  });

  useEffect(() => {
    // Update the theme when it changes in localStorage
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDark(storedTheme === "dark");
      setTheme(storedTheme);
    }
  }, [setTheme]);

  const handleToggleChange = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    setTheme(newIsDark ? "dark" : "light");
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleToggleChange();
    }
  };

  const trackBackgroundColor = isDark ? "#ffffff" : "#1c1c1c";

  return (
    <div>
      <Toggle
        checked={isDark}
        onChange={handleToggleChange}
        className={`react-toggle ${
          isDark ? "react-toggle--dark" : "react-toggle--light"
        }`}
        icons={{ checked: "🌙", unchecked: "🔆" }}
        aria-label="Dark mode toggle"
        style={{ backgroundColor: trackBackgroundColor }}
        onKeyDown={(e) => handleEnter(e)}
      />
    </div>
  );
};

export default DarkModeToggle;
