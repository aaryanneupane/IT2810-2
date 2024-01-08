import { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ThemeContext } from "./components/context/Theme";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import WatchLaterPage from "./pages/WatchLaterPage";
import NotFoundPage from "./pages/NotFoundPage";
import DiscoverPage from "./pages/DiscoverPage";
import MoviePage from "./pages/MoviePage";

function App() {
  //Create a new user and store it in localStorage
  const userId = localStorage.getItem("userId");
  if (!userId) {
    localStorage.setItem("userId", Math.random().toString(36).substring(2, 11));
  }

  const isBrowserDefaultDark = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const getDefaultTheme = () => {
    const localStorageTheme = localStorage.getItem("default-theme");
    const browserDefault = isBrowserDefaultDark() ? "dark" : "light";
    return localStorageTheme || browserDefault;
  };

  const [theme, setTheme] = useState(getDefaultTheme);

  useEffect(() => {
    // Når temaet endres, oppdater localStorage
    localStorage.setItem("default-theme", theme);

    // Oppdater body-elementets klasse for temaendring
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(`${theme}-mode`);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`theme-${theme}`}>
        <Router basename="project2">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/filtered" element={<SearchPage />} />
            <Route path="/watch-later" element={<WatchLaterPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
