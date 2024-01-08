import mongoose from "mongoose";

// This a schema for the Movie entity in the mongodb database

const MovieSchema = new mongoose.Schema({
  _id: String,
  name: String,
  poster_url: String,
  year: String,
  runtime: String,
  genre: [String],
  director: { name: String },
  ratingCount: String,
  ratingValue: String,
  summary_text: String,
  cast: [{ name: String }],
});

export default mongoose.model("Movie", MovieSchema);
