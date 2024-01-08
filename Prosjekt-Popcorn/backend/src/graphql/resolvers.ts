import Movie from "../models/movie";
import User from "../models/user";

/* 
These are the resolvers for the GraphQL API.
*/

const resolvers = {
  Query: {
    // This query fetches the selected movie through the provided movie and userid
    movieById: async (
      parent: typeof Movie,
      args: { movieId: string; userId: string },
    ) => {
      console.log("Received ID:", args.movieId);

      const singleMovie = await Movie.findById(args.movieId);

      if (!singleMovie) {
        console.error("Movie not found for ID:", args.movieId);
        throw new Error("Movie not found");
      }

      const userHasMovie = await User.find({
        _id: args.userId,
        movies: { $elemMatch: { movieId: args.movieId } },
      });

      const inWatchLater = userHasMovie.length > 0 ? true : false;

      console.log("Single movie fetched:", singleMovie);
      console.log("Received search id:", args.movieId);
      console.log("Movie Name:", singleMovie.name);

      return { movie: singleMovie, inWatchLater: inWatchLater };
    },
    // This query fetches the movies titles matching the provided search query
    movieByName: async (
      parent: typeof Movie,
      args: { name: string; page: number },
    ) => {
      // Create a case-insensitive regex for the name search
      const regex = new RegExp("^" + args.name, "i");

      console.log(regex);

      //This is for dynamic loading of 16 movies each time
      const pageSize = 16;
      // Fetch movies that match the regex pattern
      // This only fetches the 10 first movies, not ready for pagination yet
      const matchingMovies = await Movie.find({
        name: regex,
      })
        .skip(pageSize * args.page - pageSize)
        .limit(pageSize);

      console.log("Movies that match the search:", matchingMovies);
      console.log("Received search query:", args.name);
      console.log("Fetched amount of moves:", matchingMovies.length);
      return matchingMovies;
    },
    // This query fetches movies based on the provided filter
    filteredMovies: async (
      parent: typeof Movie,
      args: {
        genre?: [string];
        director?: string;
        cast?: string;
        yearStart?: number;
        yearEnd?: number;
        sortingType?: string;
        page: number;
      },
    ) => {
      // Construct the query based on input arguments
      const query = {};
      //If argument doesn't have input, it won't be added to the query
      //Also, the regex will match the input, even if it's not the whole word
      if (args.genre)
        query["genre"] = {
          $all: args.genre.map(
            (genre: string) => new RegExp(`\\s*${genre}\\s*`, "i"),
          ),
        };
      if (args.director)
        query["director.name"] = new RegExp("^" + args.director, "i");
      if (args.cast)
        query["cast.name"] = { $in: new RegExp("^" + args.cast, "i") };
      if (args.yearStart && args.yearEnd)
        query["year"] = { $gte: args.yearStart, $lte: args.yearEnd };
      else if (args.yearStart) query["year"] = { $gte: args.yearStart };
      else if (args.yearEnd) query["year"] = { $lte: args.yearEnd };

      const pageSize = 32; //default to 32 items per page

      // Handle sorting
      const sortParamToSortObject = {
        Oldest: { sortingType: "year", sortingOrder: 1 },
        Newest: { sortingType: "year", sortingOrder: -1 },
        "Highest Rating": { sortingType: "ratingValue", sortingOrder: -1 },
        "Lowest Rating": { sortingType: "ratingValue", sortingOrder: 1 },
        "": {}, // Default case when no sort param is provided
      };
      const { sortingType, sortingOrder } =
        sortParamToSortObject[args.sortingType || ""];

      // Fetch movies that match the query, if given arguments
      const filteredMovies =
        Object.keys(query).length === 0
          ? []
          : await Movie.find(query)
              .sort(sortingType ? { [sortingType]: sortingOrder } : {})
              .skip(pageSize * args.page - pageSize)
              .limit(pageSize);

      const totalCount = await Movie.countDocuments(query);

      console.log("Movies that match the filter:", filteredMovies);
      console.log("Received filter query:", args);
      console.log("Fetched amount of movies:", filteredMovies.length);
      // Return the list of movies
      return { filteredMovies: filteredMovies, totalCount: totalCount };
    },
    // This query fetches 20 movies from the each of the provided genres
    movieByGenre: async (parent: typeof Movie, args: { genres: string[] }) => {
      console.log("Received ID:", args.genres);

      const matchingMovies = await Promise.all(
        args.genres.map(async (genre) => {
          const movies = await Movie.find({
            genre: genre,
          })
            .sort({ ratingValue: -1 })
            .limit(20);

          return movies;
        }),
      );
      const flatMovies = matchingMovies.flat();
      console.log("Fetched amount of movies:", flatMovies.length);
      return flatMovies;
    },
    // This query fetches the users saved movies
    watchLaterMovies: async (
      parent: typeof Movie,
      args: { userId: string },
    ) => {
      console.log("Received user id:", args.userId);

      const thisUser = await User.findById(args.userId);

      console.log(thisUser.movies.length);
      console.log("User found:", thisUser);

      let watchLaterMovies = [];

      await Promise.all(
        thisUser.movies.map(async (movie) => {
          const movies = await Movie.find({
            _id: movie.movieId,
          });
          watchLaterMovies = watchLaterMovies.concat(movies);
        }),
      );
      console.log("Received user id:", args.userId);
      console.log("Amount of movies:", watchLaterMovies.length);
      return watchLaterMovies;
    },
  },
  Mutation: {
    // This mutation adds the selected movie to the users movie list
    addMovie: async (
      parent: typeof Movie,
      args: { userId: string; movieId: string },
    ) => {
      const selectedMovie = await Movie.findById(args.movieId);

      console.log("Received id:", args.movieId);
      console.log("Movie that matched the search:", selectedMovie);

      const updatedUser = await User.findOneAndUpdate(
        { _id: args.userId, "movies.movieId": { $ne: args.movieId } }, // Check if the movie is not already present
        { $push: { movies: { movieId: args.movieId } } }, // Add the movie if not present
        { new: true, upsert: true }, // Return the updated or newly created document
      );

      console.log("For the user:", args.userId);
      console.log("Added movie with the name:", selectedMovie.name);
      return updatedUser;
    },
    // This mutation removes the the seleceted movie form the users movie list
    removeMovie: async (
      parent: typeof Movie,
      args: { userId: string; movieId: string },
    ) => {
      const selectedMovie = await Movie.findById(args.movieId);

      console.log("Received id:", args.movieId);
      console.log("Movie that matched the search:", selectedMovie);

      const updatedUser = await User.findOneAndUpdate(
        { _id: args.userId, "movies.movieId": args.movieId }, // Check if the movie is present
        { $pull: { movies: { movieId: args.movieId } } }, // Remove the movie
        { new: true }, // Return the updated document
      );

      if (!updatedUser) {
        throw new Error("Movie not found in watch later collection");
      }

      console.log("For the user:", args.userId);
      console.log("Deleted movie with the id :", args.movieId);
      return updatedUser;
    },
  },
};

export default resolvers;
