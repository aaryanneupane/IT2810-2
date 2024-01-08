import mongoose from "mongoose";

// This a schema for the User entity in the mongodb database

const UserSchema = new mongoose.Schema({
  _id: String,
  movies: [{ movieId: String }],
});

export default mongoose.model("User", UserSchema);
