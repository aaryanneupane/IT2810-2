import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MOVIE } from "../graphql/queries";
import { ADD_MOVIE, REMOVE_MOVIE } from "../graphql/mutations";
import { MovieById } from "../interfaces/movieInterface";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons/faRotateLeft";

/* 
This is the component for displaying the info page for a movie.
*/

export default function MovieInfo() {
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [statusMessage2, setStatusMessage2] = useState<string>("");
  const [inList, setInList] = useState<boolean>();

  const navigate = useNavigate();
  const { id } = useParams(); //Get id from url
  const userId = localStorage.getItem("userId"); //Get userId from localStorage

  const { loading, data } = useQuery<MovieById>(GET_MOVIE, {
    variables: { movieId: id, userId: userId },
    fetchPolicy: "network-only", // Disable caching for this query since the state of inList is not updated otherwise
    onCompleted: (data) => {
      setInList(data.movieById.inWatchLater);
    },
  });

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

    const buttonClassNames = inList ? "watchLater remove" : "watchLater add";

    return (
      <article className="page">
        <img
          className="picture"
          src={thisMovie.poster_url}
          data-src={thisMovie.poster_url}
          onError={(e) => {
            e.currentTarget.src =
              "https://select.officechoice.com.au/Themes/BPDTHEME01/theme-client-updates/img/placeholder/product-image.png";
          }}
          alt={`Movie name: ${thisMovie.name}`}
        />

        <button className="exitButton" onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faRotateLeft} style={{ color: "#e32400" }} />
          Back to home
        </button>

        <section className="line">
          <h2>
            {thisMovie.name}{" "}
            <FontAwesomeIcon icon={faStar} style={{ color: "#f5ec00" }} />{" "}
            {thisMovie.ratingValue}
          </h2>
          <section className="story">
            <p>{thisMovie.summary_text}</p>
          </section>

          <section className="subdetails">
            <p>Director : {thisMovie.director?.name}</p>
            <p>Released : {thisMovie.year}</p>
            <p>
              Cast :{" "}
              <li>
                {thisMovie.cast?.map((castMember, index) => (
                  <span key={index}>{castMember.name}</span>
                ))}
              </li>
            </p>
            <p>
              Genre :{" "}
              <li>
                {thisMovie.genre?.map((g, index) => (
                  <span key={index}>{g}</span>
                ))}
              </li>
            </p>
            <p>Runtime: {thisMovie.runtime} </p>
          </section>
          {statusMessage && (
            <div className="errorMessages">{statusMessage}</div>
          )}
          {statusMessage2 && (
            <div className="errorMessages2">{statusMessage2}</div>
          )}
        </section>
        <button className={buttonClassNames} onClick={handleListButtonClick}>
          <span className="watchLater">
            {inList ? "Remove from list" : "Watch later"}
          </span>
        </button>
      </article>
    );
  }
}
