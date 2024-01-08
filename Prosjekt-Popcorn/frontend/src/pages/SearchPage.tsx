import FilteredMovieComponent from "../components/FilteredMovieComponent";
import Header from "../components/Header";
import { useState, useEffect, useContext, KeyboardEvent } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_MOVIE_BY_NAME } from "../graphql/queries";
import { MovieDataInterface, Movie } from "../interfaces/movieInterface";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../components/context/Theme";

export default function SearchPage() {
  const [page, setPage] = useState(1);
  const [displayData, setDisplayData] = useState<Movie[]>([]);
  const [loadVisible, setLoadVisible] = useState(true);
  const { theme } = useContext(ThemeContext);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const searchQuery = params.get("search");

  useEffect(() => {
    setDisplayData([]);
    setPage(1);
  }, [searchQuery]);

  const { loading, fetchMore } = useQuery<MovieDataInterface>(
    GET_MOVIE_BY_NAME,
    {
      variables: { name: searchQuery, page: page },
      onCompleted: (newData) => {
        const newMovies = newData?.movieByName;
        setDisplayData((prevDisplayData) => {
          if (newMovies?.length < 16) {
            setLoadVisible(false);
            return [...prevDisplayData, ...newMovies];
          } else {
            setLoadVisible(true);
            return [...prevDisplayData, ...newMovies];
          }
        });
      },
    },
  );

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMore({
      variables: { name: searchQuery, page: nextPage },
    });
  };

  const enterLoadMore = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      loadMore();
    }
  };

  return (
    <main>
      <Header />
      <h1>You searched for: "{searchQuery}"</h1>
      <FilteredMovieComponent movies={displayData} />
      {loading && <h2>Loading...</h2>}
      {loadVisible && (
        <div className="buttonContainer">
          <FontAwesomeIcon
            icon={faCircleDown}
            style={{ color: theme }}
            className="loadButton"
            tabIndex={0}
            onKeyDown={(e) => {
              enterLoadMore(e);
            }}
            aria-hidden="false"
            onClick={loadMore}
          />
        </div>
      )}
    </main>
  );
}
