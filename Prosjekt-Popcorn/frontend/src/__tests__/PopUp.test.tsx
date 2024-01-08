import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import MovieComponent from "../components/MovieComponent";
import { GET_MOVIE_BY_GENRE, GET_MOVIE } from "../graphql/queries";
import { BrowserRouter as Router } from "react-router-dom";
import { expect } from "vitest";

// This is a component test for the popup component

// Define a mock movie data for the GraphQL query
const mockMovieByGenreData = {
  movieByGenre: [
    {
      poster_url:
        "https://m.media-amazon.com/images/M/MV5BMmZhNmIyMTAtYjcyYi00OTRiLWE2ODgtMWFiOWE0ZjExZGZmXkEyXkFqcGdeQXVyMTY1NzgxOTg@.",
      id: "tt13961618",
      name: "The Lifebelt",
      genre: ["Drama"],
    },
    {
      poster_url:
        "https://m.media-amazon.com/images/M/MV5BMjYyYWIzZDQtY2FhOC00NjJhLTlkYjQtYTJjNDk1ODU5MjBlXkEyXkFqcGdeQXVyODE5NzE3OTE@.",
      id: "tt11203722",
      name: "Machchhu",
      genre: ["Drama"],
    },
    {
      poster_url:
        "https://m.media-amazon.com/images/M/MV5BMjJiZjliYjUtZjMxMi00NTBmLTg3YmItZGQxMmJhNjI3OWM1XkEyXkFqcGdeQXVyNTA5OTAyOA@@.",
      id: "tt6772586",
      name: "Parallel Parking",
      genre: ["Drama"],
    },
    {
      poster_url:
        "https://m.media-amazon.com/images/M/MV5BYmUzZjA0ZWMtZDg5My00YjdiLThmYTEtZDhkYTQwZGRiM2EwXkEyXkFqcGdeQXVyMTY0NTY5MjE@.",
      id: "tt14532328",
      name: "Donna Stronger Than Pretty",
      genre: ["Drama"],
    },
    {
      poster_url:
        "https://m.media-amazon.com/images/M/MV5BMzYxMjg5NjIyOF5BMl5BanBnXkFtZTgwNTA3OTg5NjE@.",
      id: "tt4931920",
      name: "Carbon Foxes",
      genre: ["Drama"],
    },
  ],
};

const mockMovieByIdData = {
  movieById: {
    inWatchLater: false,
    movie: {
      year: "2020",
      summary_text:
        "The financial decline of an ambitious Athenian shop owner has is followed by moral collapse. A companion in his new predicament helps him to reconsider his world view and rediscover the values he once had.",
      runtime: "83 min",
      ratingCount: "13",
      ratingValue: "9.9",
      poster_url:
        "https://m.media-amazon.com/images/M/MV5BMmZhNmIyMTAtYjcyYi00OTRiLWE2ODgtMWFiOWE0ZjExZGZmXkEyXkFqcGdeQXVyMTY1NzgxOTg@.",
      name: "The Lifebelt",
      id: "tt13961618",
      genre: ["Drama"],
      director: {
        name: "Yiannis Panayiotarakos",
      },
      cast: [
        {
          name: "Panos Kokoris",
        },
        {
          name: "Christos Moustakas",
        },
        {
          name: "Dimitris Piatas",
        },
        {
          name: "Anna Psara",
        },
      ],
    },
  },
};

// Define the GraphQL query mock
const mocks = [
  {
    request: {
      query: GET_MOVIE_BY_GENRE,
      variables: { genres: ["Drama", "Sci-Fi", "Horror", "Romance", "Action"] },
    },
    result: { data: mockMovieByGenreData },
  },
  {
    request: {
      query: GET_MOVIE,
      variables: { movieId: "tt13961618", userId: null },
    },
    result: { data: mockMovieByIdData },
  },
];

test("Clicking on a movie shows the HomepagePopup", async () => {
  render(
    <Router>
      <MockedProvider mocks={mocks} addTypename={false}>
        <MovieComponent theme="dark" />
      </MockedProvider>
    </Router>,
  );

  // Wait for the movie data to be loaded
  await waitFor(() => {
    expect(screen.getByTestId("movie-poster-tt13961618")).toBeInTheDocument();
  });

  // Click on the movie poster
  fireEvent.click(screen.getByTestId("movie-poster-tt13961618"));

  // Wait for the popup to appear
  await waitFor(() => {
    expect(screen.getByTestId("popup-container")).toBeInTheDocument();
  });
});
