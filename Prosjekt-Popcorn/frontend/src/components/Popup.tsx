import { Dispatch, SetStateAction, MouseEventHandler, useState } from "react";
import "./styles/MovieInfo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MOVIE } from "../graphql/queries";
import { ADD_MOVIE, REMOVE_MOVIE } from "../graphql/mutations";
import { Movie, MovieById } from "../interfaces/movieInterface";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

/* 
This is the component for the popups for the movies, it will not be displayed when on mobile.
*/

interface PopupProps {
  movieId: string | undefined;
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}

export default function Popup({
  movieId: movieId,
  showPopup: visibility,
  setShowPopup: setShowPopup,
}: PopupProps) {
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [statusMessage2, setStatusMessage2] = useState<string>("");
  const [inList, setInList] = useState<boolean>();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); //Get userId from localStorage

  const { loading, data } = useQuery<MovieById>(GET_MOVIE, {
    variables: { movieId: movieId, userId: userId },
    fetchPolicy: "network-only", // Disable caching for this query since the user can add/remove movies from the list
    onCompleted: (data) => {
      setInList(data.movieById.inWatchLater);
    },
  });

  //closing popup when clicking outside of it
  const closePopUp: MouseEventHandler<HTMLDivElement> = (e) => {
    const isClose = (e.target as HTMLElement).closest(".container");
    if (!isClose) {
      setShowPopup(false);
    }
  };

  const [addMovie] = useMutation(ADD_MOVIE, {
    onCompleted: () => {
      setStatusMessage2("Movie was added to the list!");
      setInList(true);
    },
    onError: (error) => {
      console.error(error);
      setStatusMessage("Error: " + error.message);
    },
  });

  const [removeMovie] = useMutation(REMOVE_MOVIE, {
    onCompleted: () => {
      setStatusMessage("Movie was removed from the list!");
      setInList(false);
    },
    onError: (error) => {
      console.error(error);
      setStatusMessage("Error: " + error.message);
    },
  });

  if (loading) return <div>Loading...</div>;

  const thisMovie = data?.movieById.movie;

  //navigate to more info page
  const movieInfo = (movie: Movie) => {
    navigate(`/movie/${movie.id}`);
  };

  if (thisMovie) {
    const handleListButtonClick = () => {
      if (inList) {
        // If the movie is already in the list, remove it
        removeMovie({
          variables: { userId: userId, movieId: thisMovie.id },
        });
      } else {
        // If the movie is not in the list, add it
        addMovie({
          variables: { userId: userId, movieId: thisMovie.id },
        });
      }
    };

    const buttonClassName = inList ? "list-button remove" : "list-button add";
    return (
      visibility && (
        <div
          className="background"
          onClick={closePopUp}
          data-testid="popup-container"
          tabIndex={0}
        >
          <div className="container">
            <div className="details">
              <p className="title">{thisMovie.name}</p>
              <div className="imageContainer">
                <img
                  className="image"
                  alt={thisMovie.name}
                  src={thisMovie.poster_url}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://select.officechoice.com.au/Themes/BPDTHEME01/theme-client-updates/img/placeholder/product-image.png";
                  }}
                  data-src={thisMovie.poster_url}
                  loading="lazy"
                  data-testid={`movie-poster-${thisMovie.id}`}
                />
              </div>
              <button
                className="exit"
                onClick={() => setShowPopup(false)}
                autoFocus={!inList}
                aria-label="Close popup"
              >
                <FontAwesomeIcon icon={faX} />
              </button>
              <div className="buttonWrapper">
                <button
                  className={buttonClassName}
                  onClick={handleListButtonClick}
                  data-test="add-remove-button"
                >
                  <FontAwesomeIcon
                    className="fa"
                    icon={inList ? faMinus : faPlus}
                  />
                  <span className="button-text">
                    {inList ? "Remove from list" : "Watch later"}
                  </span>
                </button>
                <button
                  className="moreinfo-button"
                  onClick={() => movieInfo(thisMovie)}
                >
                  <FontAwesomeIcon className="fa" icon={faInfo} />
                  <span>More info</span>
                </button>
              </div>
              {statusMessage && (
                <div className="errorMessages">{statusMessage}</div>
              )}
              {statusMessage2 && (
                <div className="errorMessages2">{statusMessage2}</div>
              )}
            </div>
          </div>
        </div>
      )
    );
  }
}
