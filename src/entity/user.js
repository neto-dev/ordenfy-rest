import { mongoose, userSchema } from "../config/db/schemas/user";

var User = mongoose.model("User", userSchema);

export default User;
