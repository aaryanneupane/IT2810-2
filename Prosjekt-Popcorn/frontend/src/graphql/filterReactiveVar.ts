import { makeVar } from "@apollo/client";
/* 
This defines a Reactive Variable for containing the local state
of the filter variables.
It is not a query or mutation, but is placed in graphQL, because it
maintains local state for GraphQL operations
*/

// Define the state
export interface FilterState {
  genres: string[];
  director: string;
  cast: string;
  yearStart: number | undefined;
  yearEnd: number | undefined;
  sort: string;
  page: number;
}

// Setting up the reactive variable with default values
export const filterVar = makeVar<FilterState>({
  genres: [],
  director: "",
  cast: "",
  yearStart: undefined,
  yearEnd: undefined,
  sort: "",
  page: 1,
});
