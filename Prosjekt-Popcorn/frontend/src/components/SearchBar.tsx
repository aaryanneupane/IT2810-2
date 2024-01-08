import "./styles/SearchBar.css";
import { useState, KeyboardEvent, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "./context/Theme";
import DarkModeToggle from "./Toggle";

/* 
This is the search bar component. It is used on all pages to search for movies.
*/

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const search = () => {
    if (query !== "") {
      navigate(`/filtered/?search=${query}`);
      setQuery("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="search-box">
      <div className={`btn-search-${theme}`}>
        <FontAwesomeIcon
          icon={faSearch}
          style={{ color: theme }}
          onClick={search}
        />
      </div>
      <input
        id="search"
        type="text"
        className={`input-search input-search-${theme}`}
        placeholder="Type to Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        data-testid="search-input"
        aria-label="Search input"
      />
      <DarkModeToggle aria-label="Dark mode toggle" />
    </div>
  );
}
