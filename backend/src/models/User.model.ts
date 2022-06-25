import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  games: { type: String },
});

export const User = mongoose.model("User", UserSchema);