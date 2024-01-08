import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import { GET_MOVIE_BY_NAME } from "../graphql/queries";
import { BrowserRouter as Router } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import { expect } from "vitest";

// This is a component test for the search functonality

const mockMovieBySearchData = {
  movieByName: [
    {
      name: "Inception of a lost Art",
      id: "tt3563778",
      poster_url:
        "https://m.media-amazon.com/images/M/MV5BNGZmYTc3OGItMzk3MS00YzIzLWExMzUtMzE4MDNkOGFiZWU0XkEyXkFqcGdeQXVyNDg2NjU3NTI@.",
      ratingCount: "",
      runtime: "147 min",
      summary_text:
        "A mysterious man of a certain age, challenges a woman to his art. A world very much unseen, is only answered by the beginning of like-minded thoughts.",
      year: "2013",
      genre: ["Drama", " Mystery", " Thriller"],
      director: {
        name: "Tushar Tyagi",
      },
      cast: [
        {
          name: "Alexia Jordan",
        },
        {
          name: "Philip Lombardo",
        },
      ],
    },
    {
      name: "Inception",
      id: "tt1375666",
      poster_url:
        "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@.",
      ratingCount: "2,106,219",
      runtime: "148 min",
      summary_text:
        "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      year: "2010",
      genre: ["Action", " Adventure", " Sci-Fi"],
      director: {
        name: "Christopher Nolan",
      },
      cast: [
        {
          name: "Leonardo DiCaprio",
        },
        {
          name: "Joseph Gordon-Levitt",
        },
        {
          name: "Elliot Page",
        },
        {
          name: "Ken Watanabe",
        },
      ],
    },
  ],
};

const mocks = [
  {
    request: {
      query: GET_MOVIE_BY_NAME,
      variables: { name: "Inception", page: 1 },
    },
    result: { data: mockMovieBySearchData },
  },
];

test("Search for a movie", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Router>
        <SearchPage />
      </Router>
    </MockedProvider>,
  );

  // Get the search input
  const searchInput = screen.getByPlaceholderText("Type to Search...");

  // Simulate user input
  fireEvent.change(searchInput, { target: { value: "Inception" } });

  searchInput.focus();
  // Simulate pressing the "Enter" key
  fireEvent.keyDown(searchInput, { key: "Enter", keyCode: 13 });

  // Wait for the movie data to be loaded
  await waitFor(() => {
    expect(screen.getByTestId("movie-poster-tt3563778")).toBeInTheDocument();
    expect(screen.getByTestId("movie-poster-tt1375666")).toBeInTheDocument();
  });
});
