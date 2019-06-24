const mongoose = require("mongoose");
require("dotenv").config();

const dbURI = global.__MONGO_URI__ || "mongodb://localhost:27017/test";
console.log("dbURI is ", dbURI);

mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.set("useFindAndModify", false);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to mongodb");
});

// no need to export it since I didn't need its value
