import "./styles/FilteredMovieComponent.css";
import { Movie } from "../interfaces/movieInterface";
import { useState, KeyboardEvent } from "react";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";

interface FilteredMovieComponentProps {
  movies: Movie[];
}

/* 
This is the component that displays the movies that are filtered. It is used in the DiscoverPage, SearchPage and WatchLaterPage.
It also handles onClick events for the movies, and opens the HomePagePopup component when a movie is clicked.
We have utilised lazy loading for loading the movie thumbnails because some of the files are very high resolution.
For the movies with an inavlid url, we have utilised a "image not found" picture we found on the web.
*/

export default function FilteredMovieComponent(
  props: FilteredMovieComponentProps,
) {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie>();
  const navigate = useNavigate();

  const handleMovieClickFiltered = (movie: Movie) => {
    if (window.innerWidth < 600) {
      navigate(`/movie/${movie.id}`);
      setShowPopup(false);
    } else setSelectedMovie(movie);
    setShowPopup(true);
  };

  const handleEnter = (e: KeyboardEvent, movie: Movie) => {
    if (e.key === "Enter") {
      handleMovieClickFiltered(movie);
    }
  };

  if (props.movies) {
    const moviesRecieved = props?.movies || [];
    return moviesRecieved?.length > 0 ? (
      <section>
        <ul className="moviesContainer">
          {props.movies.map((movie) => (
            <li key={movie.id}>
              <img
                className="movieCover"
                src={movie.poster_url}
                alt={movie.name}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://select.officechoice.com.au/Themes/BPDTHEME01/theme-client-updates/img/placeholder/product-image.png";
                }}
                data-src={movie.poster_url}
                loading="lazy"
                onClick={() => handleMovieClickFiltered(movie)}
                tabIndex={0}
                onKeyDown={(e) => handleEnter(e, movie)}
                data-testid={`movie-poster-${movie.id}`}
              />
            </li>
          ))}
        </ul>
        {showPopup && (
          <Popup
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            movieId={selectedMovie?.id}
          />
        )}
      </section>
    ) : (
      <h1> No movies were found </h1>
    );
  }
}
