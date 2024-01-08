import Header from "../components/Header";
import { GET_USER_MOVES } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { MovieDataInterface, Movie } from "../interfaces/movieInterface";
import FilteredMovieComponent from "../components/FilteredMovieComponent";
import "../index.css";

/* 
This is the page for displaying the watch later list. It uses the FilteredMovieComponent
*/

export default function WatchLaterPage() {
  const userId = localStorage.getItem("userId");

  const { loading, data } = useQuery<MovieDataInterface>(GET_USER_MOVES, {
    variables: { userId: userId },
    fetchPolicy: "network-only", // Disable caching for this query since the watch later list can be updated real time
  });

  const movies: Movie[] = data?.watchLaterMovies ?? [];

  if (loading) return <div>Loading...</div>;

  return (
    <main>
      <Header />
      <div style={{ textAlign: "center" }}>
        <h1>Watch later</h1>
        <FilteredMovieComponent movies={movies} />
      </div>
    </main>
  );
}
