import mongoose from "../index";

var Schema = mongoose.Schema;

var userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  token: String
});

export { mongoose, userSchema };
