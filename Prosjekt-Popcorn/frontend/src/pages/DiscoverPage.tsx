import { useQuery } from "@apollo/client";
import { GET_FILTERED_MOVIES } from "../graphql/queries";
import { useState, useContext } from "react";
import { Pagination, Stack } from "@mui/material";
import { filterVar } from "../graphql/filterReactiveVar";
import { useReactiveVar } from "@apollo/client";
import { ThemeContext } from "../components/context/Theme";
import FilteredMovieComponent from "../components/FilteredMovieComponent";
import Header from "../components/Header";
import { Movie, MovieDataAndCount } from "../interfaces/movieInterface";
import FilterBar from "../components/FilterBar";
import "./styles/DiscoverPage.css";

/* 
The Discoverpage which is the page where you can filter movies. It uses the FilterBar component
to filter the movies, and the FilteredMovieComponent to display the movies. It also uses the
filterReactiveVar.ts file to store the filter state, and the queries.ts file to get the data
from the database.
*/

export default function DiscoverPage() {
  const [displayData, setDisplayData] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const filters = useReactiveVar(filterVar);
  const { theme } = useContext(ThemeContext);

  // Get the data from database
  const { loading } = useQuery<MovieDataAndCount>(GET_FILTERED_MOVIES, {
    variables: {
      genre: filters.genres.length > 0 ? filters.genres : "",
      director: filters.director,
      cast: filters.cast,
      yearStart: filters.yearStart,
      yearEnd: filters.yearEnd,
      page: filters.page,
      sortingType: filters.sort,
    },
    onCompleted: (data) => {
      setDisplayData(data.filteredMovies.filteredMovies);
      setTotalPages(Math.ceil(data.filteredMovies.totalCount / 32));
    },
  });

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    filterVar({
      ...filters,
      page: value,
    });
  };

  return (
    <main>
      <Header />
      <h2 className="discover-title">Filter Movies</h2>
      <FilterBar />
      <FilteredMovieComponent movies={displayData} />
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={filters.page}
            onChange={handlePageChange}
            className={`pagination-${theme}`}
            data-testid="pagination"
          />
        </Stack>
      )}
    </main>
  );
}
