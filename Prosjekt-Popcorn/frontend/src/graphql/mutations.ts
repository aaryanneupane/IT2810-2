import { gql } from "@apollo/client";

// These are the mutations we provide to the apollo server hosted on the VM

export const ADD_MOVIE = gql`
  mutation Mutation($userId: String, $movieId: String) {
    addMovie(userId: $userId, movieId: $movieId) {
      id
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation Mutation($userId: String, $movieId: String) {
    removeMovie(userId: $userId, movieId: $movieId) {
      id
    }
  }
`;
