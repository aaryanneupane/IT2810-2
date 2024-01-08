import "./styles/filterbar.css";
import { useState, useCallback, useContext } from "react";
import { useReactiveVar } from "@apollo/client";
import { filterVar, FilterState } from "../graphql/filterReactiveVar";
import _ from "lodash";
import genreList from "../interfaces/genreList";
import YearPicker from "./YearPicker";
import { ThemeContext } from "./context/Theme";

/* 
This is the filterBar, which gives us the ability to filter. We have used reactive variables
to store the filter state. This means that whenever we update the filter state, all components
that use the filter state will be re-rendered. Also, the filters will be saved so when you come
back to the filter page, the filters will be the same as when you left.
It uses the filterReactiveVar.ts file to store the filter state.
*/

export default function FilterBar() {
  const filters = useReactiveVar(filterVar) as FilterState;
  const [director, setDirector] = useState(filters.director);
  const [cast, setCast] = useState(filters.cast);
  const { theme } = useContext(ThemeContext);

  // Add or remove genre from the filter state
  const updateGenre = (clickedGenre: string): void => {
    const newGenres = filters.genres.includes(clickedGenre)
      ? filters.genres.filter((genre: string) => genre !== clickedGenre)
      : [...filters.genres, clickedGenre];

    filterVar({
      ...filters,
      genres: newGenres,
      page: 1,
    });
  };

  /*    
The rest of the code, before the HTML, is for being able to type in the
director and cast fields, without it sending a request to the server for
each letter typed. Instead, it will wait for a 1 second pause in the typing 
*/
  const updateFilters = useCallback(
    (newDirector: string, newCast: string) => {
      filterVar({
        ...filters,
        director: newDirector,
        cast: newCast,
        page: 1,
      });
    },
    [filters],
  );

  const throttledUpdate = _.throttle(updateFilters, 1000);

  const handleDirectorInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newDirector = event.target.value;
    setDirector(newDirector);
    throttledUpdate(newDirector, cast);
  };

  const handleCastInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newCast = event.target.value;
    setCast(newCast);
    throttledUpdate(director, newCast);
  };

  return (
    <main className={`filter-bar-${theme}`}>
      <div className="genres" aria-label="list of genres">
        {genreList.map((genre) => (
          <button
            data-testid={genre}
            key={genre}
            className={filters.genres.includes(genre) ? "active" : ""}
            onClick={() => {
              updateGenre(genre);
            }}
          >
            {genre}
          </button>
        ))}
      </div>
      <div className={`input-fields`} aria-label="input fields for filtering">
        <label>
          Year Start:
          <YearPicker
            data-testid="year-start"
            value={filters.yearStart}
            onChange={(newYearStart) => {
              filterVar({
                // Update the filter state
                ...filters,
                yearStart: newYearStart,
                page: 1,
              });
            }}
            endYear={filters.yearEnd}
            dataTestId="year-start"
          />
        </label>
        <label>
          Year End:
          <YearPicker
            data-testid="year-end"
            value={filters.yearEnd}
            onChange={(newYearEnd) => {
              // Updating whole filter state
              filterVar({
                ...filters,
                yearEnd: newYearEnd,
                page: 1,
              });
            }}
            startYear={filters.yearStart}
            dataTestId="year-end"
          />
        </label>
        <label>
          Director:
          <input
            type="text"
            value={filters.director}
            onChange={handleDirectorInputChange}
            data-testid="director-input"
          />
        </label>
        <label>
          Cast:
          <input
            type="text"
            value={filters.cast}
            onChange={handleCastInputChange}
            data-testid="cast-input"
          />
        </label>
        <label>
          Sort by:
          <select
            data-testid="sort-select"
            value={filters.sort}
            onChange={(e) => {
              filterVar({
                ...filters,
                sort: e.target.value,
                page: 1, // << set page back to 1 when sort field is changed
              });
            }}
          >
            <option key={"No sort"} value={""}>
              Most relevant
            </option>
            <option key={"Highest Rating"} value={"Highest Rating"}>
              Highest Rating
            </option>
            <option key={"Lowest Value"} value={"Lowest Rating"}>
              Lowest Rating
            </option>
            <option key={"Newest"} value={"Newest"}>
              Newest
            </option>
            <option key={"Oldest"} value={"Oldest"}>
              Oldest
            </option>
          </select>
        </label>
        <button
          data-testid="clear-btn"
          className="clear-btn"
          onClick={() => {
            filterVar({
              genres: [],
              director: "",
              cast: "",
              yearStart: undefined,
              yearEnd: undefined,
              sort: "",
              page: 1,
            });
          }}
        >
          Clear Filters
        </button>
      </div>
    </main>
  );
}
