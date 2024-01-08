import "./styles/Header.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { ThemeContext } from "./context/Theme";
import logo from "/pictures/icon-logo.png";
import logolightmode from "/pictures/logo-lighmode.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faFilm, faPlus } from "@fortawesome/free-solid-svg-icons";

/* 
This is the header component. It is used on all pages.
*/

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className={`header header-${theme}`}>
        <div className="header-content">
          <picture
            onClick={() => {
              navigate("/");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate("/");
              }
            }}
            tabIndex={0}
          >
            <img
              className="logo"
              src={theme === "dark" ? logo : logolightmode}
              alt="Project-Popcorn logo"
            />
          </picture>
          <div className="dropdown" onClick={toggleDropdown}>
            <span>Menu</span>
            <div
              className={`dropdown-content-${theme}`}
              style={{ display: isDropdownOpen ? "block" : "none" }}
            >
              <p onClick={() => handleNavigation("/")}>
                <FontAwesomeIcon icon={faHome} />
                {" Home"}
              </p>

              <p
                onClick={() => {
                  navigate("/discover");
                }}
              >
                <FontAwesomeIcon icon={faFilm} />
                {" Discover"}{" "}
              </p>
              <p
                onClick={() => {
                  navigate("/watch-later");
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
                {" Watch later"}{" "}
              </p>
            </div>
          </div>
          <button
            data-testid="home-page"
            className={`headerBu headerBu-${theme}`}
            onClick={() => {
              navigate("/");
            }}
            title="Home"
          >
            <FontAwesomeIcon icon={faHome} />
            {" Home"}{" "}
          </button>
          <button
            data-testid="discover-page"
            className={`headerBu headerBu-${theme}`}
            onClick={() => {
              navigate("/discover");
            }}
            title="Discover"
          >
            <FontAwesomeIcon icon={faFilm} />
            {" Discover"}{" "}
          </button>
          <button
            className={`headerBu headerBu-${theme}`}
            onClick={() => {
              navigate("/watch-later");
            }}
            title="Watch later"
          >
            <FontAwesomeIcon icon={faFilm} />
            {" Watch later"}{" "}
          </button>
          <SearchBar />
        </div>
      </div>
    </header>
  );
}
