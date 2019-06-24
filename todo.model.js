const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  name: { type: String, require: true },
  done: { type: Boolean, require: true }
});

mongoose.model("Todo", toDoSchema);
