import mongoose from "../index";

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String
});

export { mongoose, userSchema };
