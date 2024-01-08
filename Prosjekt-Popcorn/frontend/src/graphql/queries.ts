import { gql } from "@apollo/client";

// These are the queries we provide to the apollo server hosted on the VM

export const GET_MOVIE = gql`
  query MovieById($movieId: String, $userId: String) {
    movieById(movieId: $movieId, userId: $userId) {
      movie {
        name
        id
        poster_url
        year
        runtime
        genre
        director {
          name
        }
        ratingCount
        ratingValue
        summary_text
        cast {
          name
        }
      }
      inWatchLater
    }
  }
`;

export const GET_MOVIE_BY_NAME = gql`
  query MovieByName($name: String, $page: Int) {
    movieByName(name: $name, page: $page) {
      name
      id
      year
      summary_text
      runtime
      cast {
        name
      }
      director {
        name
      }
      genre
      poster_url
      ratingCount
    }
  }
`;

export const GET_FILTERED_MOVIES = gql`
  query Query(
    $genre: [String]
    $director: String
    $cast: String
    $yearStart: Int
    $yearEnd: Int
    $sortingType: String
    $page: Int
  ) {
    filteredMovies(
      genre: $genre
      director: $director
      cast: $cast
      yearStart: $yearStart
      yearEnd: $yearEnd
      sortingType: $sortingType
      page: $page
    ) {
      filteredMovies {
        name
        id
        poster_url
        year
        runtime
        genre
        director {
          name
        }
        ratingCount
        summary_text
        cast {
          name
        }
      }
      totalCount
    }
  }
`;
export const GET_MOVIE_BY_GENRE = gql`
  query MovieByGenre($genres: [String]) {
    movieByGenre(genres: $genres) {
      id
      poster_url
      genre
    }
  }
`;

export const GET_USER_MOVES = gql`
  query WatchLaterMovies($userId: String) {
    watchLaterMovies(userId: $userId) {
      id
      name
      poster_url
      year
      runtime
      genre
      director {
        name
      }
      ratingCount
      summary_text
      cast {
        name
      }
    }
  }
`;
