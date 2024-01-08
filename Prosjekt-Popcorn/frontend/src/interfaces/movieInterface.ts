/* 
This is the interface for the movie data that is fetched from the database.
*/

export interface MovieDataInterface {
  [key: string]: {
    name?: string;
    id: string;
    poster_url?: string;
    year?: string;
    runtime?: string;
    genre?: string[];
    director?: { name: string };
    ratingCount?: string;
    ratingValue?: string;
    summary_text?: string;
    cast?: [{ name: string }];
  }[];
}

export interface Movie {
  id: string;
  name?: string;
  poster_url?: string;
  year?: string;
  runtime?: string;
  genre?: string[];
  director?: {
    name: string;
  };
  ratingCount?: string;
  ratingValue?: string;
  summary_text?: string;
  cast?: { name: string }[];
}

export interface MovieDataAndCount {
  filteredMovies: {
    filteredMovies: Movie[];
    totalCount: number;
  };
}

export interface MovieById {
  movieById: {
    movie: Movie;
    inWatchLater: boolean;
  };
}
