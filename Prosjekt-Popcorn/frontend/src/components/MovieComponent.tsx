import styles from "./styles/MovieComponent.module.css";
import Popup from "./Popup";
import { useState, KeyboardEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Movie, MovieDataInterface } from "../interfaces/movieInterface";
import { useQuery } from "@apollo/client";
import { GET_MOVIE_BY_GENRE } from "../graphql/queries";
import { useNavigate } from "react-router-dom";

/* 
This is the component for displaying the movies on the homepage.
*/

export default function MovieComponent({ theme }: { theme: "light" | "dark" }) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const genres = ["Drama", "Sci-Fi", "Horror", "Romance", "Action"];
  const navigate = useNavigate();

  const { loading, data } = useQuery<MovieDataInterface>(GET_MOVIE_BY_GENRE, {
    variables: { genres: genres },
  });

  if (loading) return <div>Loading...</div>;

  //Will not be displayed on mobile
  const handleMovieClick = (movie: Movie) => {
    if (window.innerWidth < 600) {
      navigate(`/movie/${movie.id}`);
      setShowPopup(false);
    } else setSelectedMovie(movie);
    setShowPopup(true);
  };

  const scrollMovieList = (index: number, scrollOffset: number) => {
    const movieList = document.getElementById("movieListId" + index);
    if (movieList) {
      const scrollWidth = movieList.scrollWidth;
      const clientWidth = movieList.clientWidth;
      const maxScrollLeft = scrollWidth - clientWidth;

      let newScrollLeft = movieList.scrollLeft + scrollOffset;

      if (newScrollLeft < 0) {
        newScrollLeft = maxScrollLeft;
      } else if (newScrollLeft > maxScrollLeft) {
        newScrollLeft = 0;
      }
      movieList.scrollBy({
        left: newScrollLeft - movieList.scrollLeft,
        behavior: "smooth",
      });
    }
  };

  let movies: Movie[] = [];

  if (data?.movieByGenre) {
    movies = data.movieByGenre.map((movie) => ({
      ...movie,
      name: movie.name,
    }));
  }

  const genreMovie = (movie: Movie, genre: string) => {
    return movie.genre?.includes(genre) ?? false;
  };

  const handleKeyDown = (e: KeyboardEvent, movie: Movie) => {
    if (e.key === "Enter") {
      handleMovieClick(movie);
    }
  };

  return (
    <div>
      {genres.map((genre, index) => (
        <section key={index} className={`${styles.scrollContainer} ${theme}`}>
          <h2>{genre}</h2>
          <div className={styles.buttonAndListContainer}>
            <button
              onClick={() => scrollMovieList(index, -150)}
              className={`${styles.scrollButton} ${styles.scrollLeft}`}
              aria-label={`Scroll left for ${genre} movies`}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{
                  color:
                    theme === "dark" ? "#d2d1d1" : "#your-light-theme-color",
                }}
              />
            </button>
            <ul className={styles.movieList} id={"movieListId" + index}>
              {movies
                .filter((movie) => genreMovie(movie, genre))
                .map((movie) => (
                  <li key={movie.id}>
                    {movie.poster_url && (
                      <>
                        <img
                          src={movie.poster_url}
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://select.officechoice.com.au/Themes/BPDTHEME01/theme-client-updates/img/placeholder/product-image.png";
                          }}
                          alt={`Movie id: ${movie.id}`}
                          className={`${styles.movieCover} ${styles.scrollmenu}`}
                          data-testid={`movie-poster-${movie.id}`}
                          data-src={movie.poster_url}
                          loading="lazy"
                          onClick={() => handleMovieClick(movie)}
                          onKeyDown={(e) => handleKeyDown(e, movie)}
                          tabIndex={0}
                        />
                      </>
                    )}
                  </li>
                ))}
            </ul>
            <button
              onClick={() => scrollMovieList(index, 150)}
              className={`${styles.scrollButton} ${styles.scrollRight}`}
              aria-label={`Scroll right for ${genre} movies`}
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{
                  color:
                    theme === "dark" ? "#d2d1d1" : "#your-light-theme-color",
                }}
              />
            </button>
          </div>
        </section>
      ))}
      {showPopup && (
        <Popup
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          movieId={selectedMovie?.id}
        />
      )}
    </div>
  );
}
