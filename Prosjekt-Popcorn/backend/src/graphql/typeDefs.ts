import gql from "graphql-tag";

/* 
These are the type definitions for the GraphQL API.
*/

const typeDefs = gql`
  # Movie object

  type Movie {
    name: String
    id: String
    poster_url: String
    year: String
    runtime: String
    genre: [String]
    director: Director
    ratingCount: String
    ratingValue: String
    summary_text: String
    cast: [CastMember]
  }

  type User {
    id: String
    movies: [String]
  }

  type moreDetails {
    movie: Movie
    inWatchLater: Boolean
  }

  type Director {
    name: String
  }

  type MovieData {
    filteredMovies: [Movie]
    totalCount: Int
  }

  type CastMember {
    name: String
  }

  type Query {
    movieById(movieId: String, userId: String): moreDetails
    movieByName(name: String, page: Int): [Movie]
    filteredMovies(
      genre: [String]
      director: String
      cast: String
      yearStart: Int
      yearEnd: Int
      sortingType: String
      page: Int
    ): MovieData
    movieByGenre(genres: [String]): [Movie]
    watchLaterMovies(userId: String): [Movie]
  }

  type Mutation {
    addMovie(userId: String, movieId: String): User
    removeMovie(userId: String, movieId: String): User
  }
`;

export default typeDefs;
