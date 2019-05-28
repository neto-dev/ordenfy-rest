var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });

export default mongoose;
